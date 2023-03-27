const SPOTIFY_CLIENT_ID = "928713b0001c4592a9910f798369bffb";
const SPOTIFY_PKCE_CODE_VERIFIER_KEY = "spotify_code_verifier";
const SPOTIFY_ACCESS_TOKEN_KEY = "spotify_access_token";
const SPOTIFY_REFRESH_TOKEN_KEY = "spotify_refresh_token";

const getStorageMechanism = ():
  | typeof window.localStorage
  | typeof window.sessionStorage => {
  return window.localStorage;
};
const getAccessToken = () =>
  getStorageMechanism().getItem(SPOTIFY_ACCESS_TOKEN_KEY);

const setAccessToken = (accessToken: string) =>
  getStorageMechanism().setItem(SPOTIFY_ACCESS_TOKEN_KEY, accessToken);

const getRefreshToken = () =>
  getStorageMechanism().getItem(SPOTIFY_REFRESH_TOKEN_KEY);

const setRefreshToken = (refreshToken: string) =>
  getStorageMechanism().setItem(SPOTIFY_REFRESH_TOKEN_KEY, refreshToken);

const getCodeVerifier = () =>
  getStorageMechanism().getItem(SPOTIFY_PKCE_CODE_VERIFIER_KEY);

const setCodeVerifier = (codeVerifier: string) =>
  getStorageMechanism().setItem(SPOTIFY_PKCE_CODE_VERIFIER_KEY, codeVerifier);

const getSpotifyAuthorizationCodeFromSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("code");
};

function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: any) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier)
  );

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
const clearAllLocalStorage = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
};
const refreshPageWithoutParams = () => {
  window.location.href = window.location.href.split("?")[0];
};

interface InitialTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface InitialTokenAcquisitionOpts {
  code: string;
  codeVerifier: string;
}

const getTokens = async ({
  code,
  codeVerifier,
}: InitialTokenAcquisitionOpts): Promise<InitialTokenResponse> => {
  const res = await fetch(
    "https://accounts.spotify.com/api/token?" +
      new URLSearchParams({
        code,
        redirect_uri: `${import.meta.env.PUBLIC_SITE_DOMAIN}${import.meta.env.PUBLIC_BASE_URL}`,
        grant_type: "authorization_code",
        code_verifier: codeVerifier,
        client_id: SPOTIFY_CLIENT_ID,
      }).toString(),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  );
  if (res.status !== 200) {
    throw new Error("Bad authorization_code");
  }
  return res.json();
};

interface SpotifyClientOptions {
  onReady: (loggedIn: boolean) => void;
}

export class SpotifyClient {
  loggedIn = false;
  tokenAcquisitionPromise: Promise<any> | null = null;
  onReady: SpotifyClientOptions["onReady"];
  constructor(options: Partial<SpotifyClientOptions> = {}) {
    const { onReady = () => {} } = options;
    this.onReady = onReady;
    const codeVerifier = getCodeVerifier();
    const spotifyAuthorizationCode =
      getSpotifyAuthorizationCodeFromSearchParams();
    if (codeVerifier && spotifyAuthorizationCode) {
      this.doTokenInitialization({
        code: spotifyAuthorizationCode,
        codeVerifier,
      });
    } else {
      this.determineIfLoggedIn();
    }
  }

  doTokenInitialization({ code, codeVerifier }: InitialTokenAcquisitionOpts) {
    const fn = async () => {
      try {
        const res = await getTokens({
          code,
          codeVerifier,
        });
        setAccessToken(res.access_token);
        setRefreshToken(res.refresh_token);
      } catch (error) {
        console.log("Error getting access tokens", error);
        clearAllLocalStorage();
        refreshPageWithoutParams();
      }
      this.loggedIn = true;
      this.tokenAcquisitionPromise = null;
      window.history.replaceState(
        null,
        "",
        window.location.pathname.split("?")[0]
      );
      this.onReady(this.loggedIn);
    };
    this.tokenAcquisitionPromise = fn();
  }
  async attemptAccessTokenRefresh() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("Invalid Refresh Token");
    }
    const res = await fetch(
      "https://accounts.spotify.com/api/token?" +
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: SPOTIFY_CLIENT_ID,
        }).toString(),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }
    );
    if (res.status !== 200) {
      throw new Error("Something went wrong in refresh token acquisition");
    }
    const { access_token, refresh_token } = await res.json();
    setAccessToken(access_token);
    if (refresh_token) {
      setRefreshToken(refresh_token);
    }
  }

  async determineIfLoggedIn() {
    try {
      await this.fetchSpotifyRoute("https://api.spotify.com/v1/me");
      this.loggedIn = true;
      this.onReady(this.loggedIn);
    } catch {
      this.onReady(false);
    }
  }

  async fetchSpotifyRoute(routeName: string): Promise<any> {
    if (this.tokenAcquisitionPromise) await this.tokenAcquisitionPromise;

    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No Access Token Found");
    }
    try {
      const res = await await fetch(routeName, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        if (this.tokenAcquisitionPromise) {
          await this.tokenAcquisitionPromise;
          return this.fetchSpotifyRoute(routeName);
        } else {
          this.tokenAcquisitionPromise = this.attemptAccessTokenRefresh();
          await this.tokenAcquisitionPromise;
          this.tokenAcquisitionPromise = null;
          return this.fetchSpotifyRoute(routeName);
        }
      } else {
        throw new Error("Not authenticated");
      }
    } catch {
      clearAllLocalStorage();
      refreshPageWithoutParams();
    }
    return null;
  }
  async initiateAuthFlow() {
    const codeVerifier = generateRandomString(64);
    setCodeVerifier(codeVerifier);

    window.location.href =
      "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope:
          "playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative",
        redirect_uri: `${import.meta.env.PUBLIC_SITE_DOMAIN}${import.meta.env.PUBLIC_BASE_URL}`,
        code_challenge_method: "S256",
        code_challenge: await generateCodeChallenge(codeVerifier),
      }).toString();
  }
}

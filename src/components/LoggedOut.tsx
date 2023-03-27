import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import type { SpotifyClient } from "../utils/spotify";
import SpotifyIcon from "./icons/SpotifyIcon";

function LoggedOut(props: { spotifyClient?: SpotifyClient }) {
  return (
    <div class="col-span-12 grid auto-rows-min grid-cols-1">
      <h2 class="text-center text-xl font-semibold">
        You are currently logged out.
      </h2>
      <div>
        <p class="py-8 text-center">
          You must login to this app through Spotify in order to view your
          duplicate songs
        </p>
        <div class="flex justify-center">
          <button
            onClick={() => {
              if (props.spotifyClient) {
                props.spotifyClient.initiateAuthFlow();
              }
            }}
            class="flex items-center justify-start rounded-lg border-2 border-green-900 bg-green-600 p-2 text-center text-gray-200"
          >
            <SpotifyIcon class="mr-2 w-[1em] fill-[currentColor]" />
            Click here to login through Spotify
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoggedOut;

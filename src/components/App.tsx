import { createSignal, onMount } from "solid-js";
import { SpotifyClient } from "../utils/spotify";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import clsx from "clsx";

const queryClient = new QueryClient();
const App = () => {
  const [loggedIn, setLoggedIn] = createSignal<null | boolean>(null);
  const [topShadowEnabled, setTopShadowEnabled] = createSignal(false);
  const [bottomShadowEnabled, setBottomShadowEnabled] = createSignal(false);

  const [spotifyClient, setSpotifyClient] = createSignal<
    SpotifyClient | undefined
  >();
  onMount(async () => {
    const ob = new IntersectionObserver((entries) => {
      console.log("observing");
      for (const entry of entries) {
        if (entry.target.id === "top-shadow-trigger") {
          setTopShadowEnabled(!entry.isIntersecting);
        } else if (entry.target.id === "bottom-shadow-trigger") {
          setBottomShadowEnabled(!entry.isIntersecting);
        }
      }
    });
    ob.observe(document.getElementById("top-shadow-trigger"));
    ob.observe(document.getElementById("bottom-shadow-trigger"));
    setSpotifyClient(
      new SpotifyClient({
        onReady: (value) => setLoggedIn(value),
      })
    );
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div class="relative flex h-full w-full flex-col">
        <div class="relative flex-grow overflow-y-clip">
          <div class="grid h-full grid-cols-12 grid-rows-[auto_auto_1fr] overflow-y-auto">
            <div id="top-shadow-trigger" />

            <div
              class={clsx(
                bottomShadowEnabled() &&
                  "shadow-[inset_0px_-40px_20px_-20px_rgba(0,0,0,0.3)]",
                "pointer-events-none absolute top-0 z-10 h-full w-full transition-[box-shadow] duration-500 delay-50"
              )}
            />
            <div
              class={clsx(
                topShadowEnabled() &&
                  "shadow-[inset_0_40px_20px_-20px_rgba(0,0,0,0.3)]",
                "pointer-events-none absolute top-0 z-10 h-full w-full transition-[box-shadow] duration-500 delay-50"
              )}
            />

            <h1 class="col-span-12 h-fit px-10 py-4 text-center text-4xl font-bold">
              Spotify Song Deduplicator
            </h1>
            {loggedIn() === null && (
              <div class="col-span-12 flex justify-center">
                <div class="h-16 w-16  animate-spin rounded-full border-8 border-solid border-gray-400 border-t-green-300 text-center" />
              </div>
            )}
            {loggedIn() !== null &&
              (loggedIn() ? (
                <LoggedIn spotifyClient={spotifyClient() as SpotifyClient} />
              ) : (
                <LoggedOut spotifyClient={spotifyClient()} />
              ))}
            <div id="bottom-shadow-trigger" class="-mt-1" />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;

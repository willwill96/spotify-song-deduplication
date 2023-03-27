import { createQuery } from "@tanstack/solid-query";
import { createSignal, For, onMount } from "solid-js";
import type { SpotifyClient } from "../utils/spotify";
import SpotifyIcon from "./icons/SpotifyIcon";

interface Playlist {
  id: string;
  name: string;
  owner: {
    id: string;
  };
  collaborative: boolean;
}

function LoggedIn(props: { spotifyClient: SpotifyClient }) {
  const playlistQuery = createQuery(
    () => ["playlistsData"],
    () =>
      props.spotifyClient.fetchSpotifyRoute(
        "https://api.spotify.com/v1/me/playlists"
      )
  );

  const userQuery = createQuery(
    () => ["userData"],
    () => props.spotifyClient.fetchSpotifyRoute("https://api.spotify.com/v1/me")
  );
  const [selectedPlaylists, setSelectedPlaylists] = createSignal<Playlist[]>(
    []
  );

  const onToggleCheckboxItem = (item: Playlist) => {
    const playlists = selectedPlaylists();
    if (playlists.find((subitem) => subitem.id === item.id)) {
      setSelectedPlaylists(
        playlists.filter((subitem) => subitem.id !== item.id)
      );
    } else {
      setSelectedPlaylists([...playlists, item]);
    }
  };

  const likedSongsItem: Playlist = {
    id: "__liked_songs",
    name: "Liked Songs",
    owner: {
      id: userQuery.data.id || "",
    },
    collaborative: false,
  };
  const isEveryPlaylistToggled = () => {
    return items().length + 1 === selectedPlaylists().length;
  };

  const items = () =>
    playlistQuery.data &&
    playlistQuery.data.items &&
    playlistQuery.data.items.filter((item: Playlist) => {
      return item.collaborative || item.owner.id === userQuery.data.id;
    });

  const onToggleAll = () => {
    if (isEveryPlaylistToggled()) {
      setSelectedPlaylists([]);
    } else {
      setSelectedPlaylists([likedSongsItem, ...items()]);
    }
  };

  const isSongSelected = (item: Playlist) =>
    Boolean(selectedPlaylists().find(({ id }) => item.id === id));
  return (
    <div class="relative col-span-12 h-full grid-cols-1 px-6">
      {playlistQuery.isLoading ||
        (userQuery.isLoading && <span>Loading your playlists...</span>)}

      {items() && (
        <>
          <span class="block text-center">
            Select the playlists you want to search for duplicate songs:
          </span>
          <div class="relative flex flex-col gap-4 py-4" role="group">
            <div
              aria-checked={isEveryPlaylistToggled()}
              onKeyDown={(event) => {
                // Make sure to prevent page scrolling on space down
                if (event.key === " ") {
                  event.preventDefault();
                }
              }}
              onKeyUp={(event) => {
                if (event.key === " ") {
                  onToggleAll();
                }
              }}
              onClick={() => {
                onToggleAll();
              }}
              tabIndex="0"
              role="checkbox"
              class="flex h-24 w-full cursor-pointer items-center rounded-lg border bg-green-100 text-lg font-semibold focus-within:border-4 focus-within:border-green-600 hover:bg-green-300 aria-checked:bg-green-600 aria-checked:text-white"
            >
              <div class="block aspect-square h-full bg-black p-4 [&>svg]:h-fit [&>svg]:fill-green-600">
                <SpotifyIcon />
              </div>
              <span class="block flex-grow p-4 text-center">
                All Playlists
                {isEveryPlaylistToggled() && (
                  <span class="float-right">{" \u2713"}</span>
                )}
              </span>
            </div>
            <div
              aria-checked={isSongSelected(likedSongsItem)}
              onKeyDown={(event) => {
                // Make sure to prevent page scrolling on space down
                if (event.key === " ") {
                  event.preventDefault();
                }
              }}
              onKeyUp={(event) => {
                if (event.key === " ") {
                  onToggleCheckboxItem(likedSongsItem);
                }
              }}
              onClick={() => {
                onToggleCheckboxItem(likedSongsItem);
              }}
              tabIndex="0"
              role="checkbox"
              class="flex h-24 w-full cursor-pointer items-center rounded-lg border bg-green-100 text-lg font-semibold focus-within:border-4 focus-within:border-green-600 hover:bg-green-300 aria-checked:bg-green-600 aria-checked:text-white"
            >
              <div class="block aspect-square h-full bg-black p-4 [&>svg]:h-fit [&>svg]:fill-green-600">
                <SpotifyIcon />
              </div>
              <span class="block flex-grow p-4 text-center">
                Liked Songs
                {isSongSelected(likedSongsItem) && (
                  <span class="float-right">{" \u2713"}</span>
                )}
              </span>
            </div>
            <For each={items()}>
              {(item) => {
                return (
                  <div
                    aria-checked={isSongSelected(item)}
                    onKeyDown={(event) => {
                      // Make sure to prevent page scrolling on space down
                      if (event.key === " ") {
                        event.preventDefault();
                      }
                    }}
                    onKeyUp={(event) => {
                      if (event.key === " ") {
                        onToggleCheckboxItem(item);
                      }
                    }}
                    onClick={() => {
                      onToggleCheckboxItem(item);
                    }}
                    tabIndex="0"
                    role="checkbox"
                    class="flex h-24 w-full cursor-pointer items-center rounded-lg border bg-green-100 text-lg font-semibold focus-within:border-4 focus-within:border-green-600 hover:bg-green-300 aria-checked:bg-green-600 aria-checked:text-white"
                  >
                    {item.images && item.images.length > 0 ? (
                      <img
                        class="aspect-square h-full"
                        src={item.images[0].url}
                      />
                    ) : (
                      <div class="block aspect-square h-full bg-black p-4 [&>svg]:h-fit [&>svg]:fill-green-600">
                        <SpotifyIcon />
                      </div>
                    )}
                    <span class="block flex-grow p-4 text-center">
                      {item.name}

                      {isSongSelected(item) && (
                        <span class="float-right">{" \u2713"}</span>
                      )}
                    </span>
                  </div>
                );
              }}
            </For>
          </div>
        </>
      )}
    </div>
  );
}

export default LoggedIn;

import { createQuery } from "@tanstack/solid-query";
import clsx from "clsx";
import { createSignal, For } from "solid-js";
import type { SpotifyClient } from "../utils/spotify";
import SpotifyIcon from "./icons/SpotifyIcon";

interface Playlist {
  id: string;
  name: string;
  owner: {
    id: string;
  };
  images?: {
    url: string;
  }[];
  collaborative: boolean;
}

const CheckboxItem = (props: {
  class?: string;
  checked: boolean;
  onSelect: () => void;
  label: string;
  imageUrl?: false | string;
}) => {
  return (
    <div
      aria-checked={props.checked}
      onKeyDown={(event) => {
        // Make sure to prevent page scrolling on space down
        if (event.key === " ") {
          event.preventDefault();
        }
      }}
      onKeyUp={(event) => {
        if (event.key === " ") {
          props.onSelect();
        }
      }}
      onClick={() => {
        props.onSelect();
      }}
      tabIndex="0"
      role="checkbox"
      class={clsx(
        props.class,
        "flex h-24 w-full cursor-pointer items-center rounded-lg border-2 border-gray-500 bg-green-100 text-lg font-semibold focus-within:bg-green-300 focus-within:shadow-[0_1px_0px_5px_black,1px_0_0px_5px_black,0_-1px_0_5px_black,-1px_0_0_5px_black] hover:bg-green-300 aria-checked:bg-green-600 aria-checked:text-white"
      )}
    >
      <div class="block aspect-square h-full rounded-l-lg bg-black p-4 [&>svg]:h-fit [&>svg]:fill-green-600">
        {props.imageUrl ? (
          <img class="aspect-square h-full" src={props.imageUrl} />
        ) : (
          <div class="block aspect-square h-full bg-black p-4 [&>svg]:h-fit [&>svg]:fill-green-600">
            <SpotifyIcon />
          </div>
        )}
      </div>
      <span class="block flex-grow p-4 text-center">
        {props.label}
        {props.checked && <span class="float-right">{" \u2713"}</span>}
      </span>
    </div>
  );
};

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
      id: (userQuery.data && userQuery.data.id) || "",
    },
    collaborative: false,
  };
  const isEveryPlaylistToggled = () => {
    return items().length + 1 === selectedPlaylists().length;
  };

  const items = (): Playlist[] =>
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
          <div
            class="relative grid gap-4 py-4 lg:grid-cols-2 xl:grid-cols-4"
            role="group"
          >
            <CheckboxItem
              class="lg:col-span-2 xl:col-span-4"
              checked={isEveryPlaylistToggled()}
              onSelect={() => {
                onToggleAll();
              }}
              label="Search All Playlists for duplicates"
            />
            <CheckboxItem
              checked={isSongSelected(likedSongsItem)}
              onSelect={() => {
                onToggleCheckboxItem(likedSongsItem);
              }}
              label="Liked Songs"
            />
            <For each={items()}>
              {(item) => {
                return (
                  <CheckboxItem
                    checked={isSongSelected(item)}
                    onSelect={() => {
                      onToggleCheckboxItem(item);
                    }}
                    label={item.name}
                    imageUrl={
                      item.images &&
                      item.images.length > 0 &&
                      item.images[0].url
                    }
                  />
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

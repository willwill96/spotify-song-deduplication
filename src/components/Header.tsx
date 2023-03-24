import { faGithub as FaGithub } from "@fortawesome/free-brands-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import IconButton from "./IconButton";

const githubRepoUrl =
  "https://github.com/willwill96/spotify-song-deduplication";

function HelloWorld(props: { title: string }) {
  const name = "Solid";
  const elements = icon(FaGithub);
  console.log(elements.html.length);
  return (
    <header class="flex h-14 w-full items-center whitespace-nowrap bg-green-200 px-2 lg:h-16">
      <a aria-label="Home" title="Home" href="/" class="flex-shrink-0">
        <img class="mx-2 h-9 w-9 rounded-full" src="/logo.png" />
      </a>
      <span class="text-lg font-bold">{props.title}</span>
      <div class="flex-grow"></div>
      <div class="flex h-full flex-shrink-0 items-center py-1">
        <IconButton
          aria-label="View the Source Code"
          title="View the Source Code"
          as="a"
          class="w-12 lg:w-14 p-2"
          href={githubRepoUrl}
          innerHTML={icon(FaGithub).html.join("")}
        />
      </div>
    </header>
  );
}

export default HelloWorld;

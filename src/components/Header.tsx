import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import IconButton from "./IconButton";
import GithubIcon from "./icons/GithubIcon";

const githubRepoUrl =
  "https://github.com/willwill96/spotify-song-deduplication";

function Header(props: { title: string }) {
  return (
    <header class="flex h-14 w-full items-center whitespace-nowrap bg-green-200 px-2 lg:h-16">
      <a
        aria-label="Home"
        title="Home"
        href={`${import.meta.env.PUBLIC_BASE_URL || ""}/`}
        class="flex-shrink-0"
      >
        <img
          class="mx-2 h-9 w-9 rounded-full"
          src={`${import.meta.env.PUBLIC_BASE_URL || ""}/logo.png`}
        />
      </a>
      <span class="text-lg font-bold">{props.title}</span>
      <div class="flex-grow"></div>
      <div class="flex h-full flex-shrink-0 items-center">
        <IconButton
          aria-label="View the Source Code"
          title="View the Source Code"
          as="a"
          class="w-12 p-2 lg:w-14"
          href={githubRepoUrl}
        >
          <GithubIcon />
        </IconButton>
      </div>
    </header>
  );
}

export default Header;

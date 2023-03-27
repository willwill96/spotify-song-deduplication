import type { JSX } from "solid-js/jsx-runtime";
import { Dynamic } from "solid-js/web";
import clsx from "clsx";

type AnchorProps = {
  as: "a";
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
  as: "button";
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = (props: AnchorProps | ButtonProps) => {
  const { as = "button" } = props;
  return (
    <Dynamic
      component={as}
      {...props}
      class={clsx(
        props.class,
        "block cursor-pointer rounded-full hover:bg-gray-500/25 active:bg-gray-400 [&>svg]:h-fit [&>svg]:transition-transform [&>svg]:hover:scale-110"
      )}
    >
      {props.children}
    </Dynamic>
  );
};

export default IconButton;

import { component$ } from "@builder.io/qwik";
import { BaseSvg } from "./BaseSvg";
import type { BaseSvgProps } from "../../models";

export const SearchIcon = component$<BaseSvgProps>((props) => {
  return (
    <BaseSvg {...props}>
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </BaseSvg>
  );
});

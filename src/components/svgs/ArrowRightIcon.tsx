import { component$ } from "@builder.io/qwik";
import { BaseSvg } from "./BaseSvg";
import type { BaseSvgProps } from "../../models";

export const ArrowRightIcon = component$<BaseSvgProps>((props) => {
  return (
    <BaseSvg {...props}>
      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </BaseSvg>
  );
});

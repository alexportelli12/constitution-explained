import { component$ } from "@builder.io/qwik";
import { BaseSvg } from "./BaseSvg";
import type { BaseSvgProps } from "../../models";

export const ChevronRightIcon = component$<BaseSvgProps>((props) => {
  return (
    <BaseSvg {...props}>
      <path d="M9 5l7 7-7 7" />
    </BaseSvg>
  );
});

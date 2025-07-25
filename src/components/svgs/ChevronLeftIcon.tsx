import { component$ } from "@builder.io/qwik";
import { BaseSvg } from "./BaseSvg";
import type { BaseSvgProps } from "../../models";

export const ChevronLeftIcon = component$<BaseSvgProps>((props) => {
  return (
    <BaseSvg {...props}>
      <path d="M15 19l-7-7 7-7" />
    </BaseSvg>
  );
});

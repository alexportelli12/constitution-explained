import { component$ } from "@builder.io/qwik";
import { BaseSvg } from "./BaseSvg";
import type { BaseSvgProps } from "../../models";

export const CloseIcon = component$<BaseSvgProps>((props) => {
  return (
    <BaseSvg {...props}>
      <path d="M6 18L18 6M6 6l12 12" />
    </BaseSvg>
  );
});

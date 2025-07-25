import { component$ } from "@builder.io/qwik";
import { BaseSvg } from "./BaseSvg";
import type { BaseSvgProps } from "../../models";

export const ClockIcon = component$<BaseSvgProps>((props) => {
  return (
    <BaseSvg {...props}>
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </BaseSvg>
  );
});

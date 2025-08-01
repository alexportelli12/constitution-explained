import { component$ } from "@builder.io/qwik";
import { BaseSvg } from "./BaseSvg";
import type { BaseSvgProps } from "../../models";

export const StarIcon = component$<BaseSvgProps>((props) => {
  return (
    <BaseSvg {...props} strokeWidth={props.strokeWidth || 1.5}>
      <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </BaseSvg>
  );
});

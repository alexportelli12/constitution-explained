import { component$ } from "@builder.io/qwik";
import { BaseSvg } from "./BaseSvg";
import type { BaseSvgProps } from "../../models";

export const DocumentIcon = component$<BaseSvgProps>((props) => {
  return (
    <BaseSvg {...props} strokeWidth={props.strokeWidth || 1.5}>
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </BaseSvg>
  );
});

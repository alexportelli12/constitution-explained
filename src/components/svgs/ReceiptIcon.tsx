import { component$ } from "@builder.io/qwik";
import { BaseSvg } from "./BaseSvg";
import type { BaseSvgProps } from "../../models";

export const ReceiptIcon = component$<BaseSvgProps>((props) => {
  return (
    <BaseSvg {...props} strokeWidth={props.strokeWidth || 1.5}>
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM13 8h2M13 12h2M13 16h2M7 8h2v8H7V8z" />
    </BaseSvg>
  );
});

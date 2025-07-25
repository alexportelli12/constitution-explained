import { Timestamp } from "firebase/firestore";
import type { QRL } from "@builder.io/qwik";

export type EventType = "page_view" | "button_click";
export type DeviceType = "mobile" | "tablet" | "desktop";

export interface AnalyticsEvent {
  eventType: EventType;
  page: string;
  timestamp: Timestamp;
  device: DeviceType;
  tag?: string;
}

export interface AnalyticsContextValue {
  trackPageView: QRL<(page: string) => Promise<void>>;
  trackButtonClick: QRL<(tag: string, page: string) => Promise<void>>;
}

export interface AnalyticsButtonProps {
  onClick$?: QRL<() => void>;
  eventTag: string;
  class?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onKeyDown$?: QRL<(event: KeyboardEvent) => void>;
}

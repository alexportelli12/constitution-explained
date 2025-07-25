# PRP: Firebase Analytics Tracking for Constitution Explained

## 📋 **Feature Overview**

Implement a lightweight, privacy-respecting analytics system using Firebase Firestore to track:

- Page visits with route information
- Button clicks with component identification
- Device size detection (mobile/tablet/desktop)
- Timestamped events for usage insights

**Privacy-First**: No personal data, IP addresses, or user-identifiable information collected.

---

## 🧠 **Critical Context for AI Agent**

### **Current Codebase Architecture**

This Qwik application follows specific patterns that MUST be maintained:

#### **Firebase Setup Status**

- **Package**: Firebase 12.0.0 already installed in dependencies
- **Hosting**: Configured in `firebase.json` but **NO Firebase SDK initialization exists**
- **Firestore**: Not configured - needs complete setup from scratch

#### **Service Pattern** (Follow `src/lib/fetchMarkdown.ts`)

```typescript
export const fetchOverviewContent = async (
  level: AgeLevel,
): Promise<OverviewContent> => {
  try {
    const response = await fetch(`/constitution/overview/${level}.md`);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.status}`);
    }
    const content = await response.text();
    return { level, content };
  } catch (error) {
    return {
      level,
      content: "",
      error: `Failed to load ${level} content. Please try again later.`,
    };
  }
};
```

#### **Component Pattern** (Follow `src/components/AgeLevelToggle.tsx`)

```typescript
import { component$, type Signal, type QRL } from "@builder.io/qwik";
import { clsx } from "clsx";

interface AgeLevelToggleProps {
  activeLevel: Signal<AgeLevel | undefined>;
  onLevelChange: QRL<(level: AgeLevel) => void>;
}

export const AgeLevelToggle = component$<AgeLevelToggleProps>(
  ({ activeLevel, onLevelChange }) => {
    return (
      <div class="grid grid-cols-4 gap-1.5 my-1.5">
        {levels.map((level) => (
          <button
            key={level.key}
            class={clsx(
              "px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeLevel.value === level.key
                ? "bg-primary-500 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            )}
            onClick$={() => onLevelChange(level.key)}
          >
            {level.label}
          </button>
        ))}
      </div>
    );
  }
);
```

#### **Context Pattern** (Follow `src/contexts/AgeLevelContext.tsx`)

```typescript
import {
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
  useTask$,
  $,
  component$,
  type Signal,
  type QRL,
} from "@builder.io/qwik";

export interface AgeLevelContextValue {
  activeLevel: Signal<AgeLevel>;
  setActiveLevel: QRL<(level: AgeLevel) => void>;
}

export const AgeLevelContext =
  createContextId<AgeLevelContextValue>("age-level-context");

// LocalStorage with SSR safety
if (typeof window !== "undefined") {
  localStorage.setItem(STORAGE_KEY, level);
}
```

#### **Import/Export Pattern**

- **All directories have `index.ts`** for centralized exports
- **Pattern**: `export * from "./ComponentName"`
- **Usage**: `import { Component } from "../components"`

#### **Model/Interface Pattern** (Follow `src/models/chapter.model.ts`)

- **All interfaces and types** stored in `src/models/*.model.ts` files
- **Centralized exports** via `src/models/index.ts`
- **Import pattern**: `import type { Chapter, ChapterContent } from "../models"`
- **File naming**: `feature-name.model.ts` (e.g., `analytics.model.ts`)

```typescript
// Example: src/models/chapter.model.ts
export interface Chapter {
  chapter: string;
  title: string;
  description: string;
  tags: string[];
  heroImage: string;
  articleCount: number;
}

export interface ChapterContent {
  level: AgeLevel;
  content: string;
  chapter: string;
  error?: string;
}
```

---

## 🛠️ **Implementation Blueprint**

### **Phase 1: Analytics Models & Types**

#### **1.1 Analytics Models**

**CRITICAL**: All interfaces must be placed in the models folder following the established pattern.

Create `src/models/analytics.model.ts`:

```typescript
import { Timestamp } from "firebase/firestore";

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
  trackPageView: (page: string) => Promise<void>;
  trackButtonClick: (tag: string, page: string) => Promise<void>;
}

export interface AnalyticsButtonProps {
  onClick$?: QRL<() => void>;
  eventTag: string;
  class?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: any;
  // Allow any other button props
  [key: string]: any;
}
```

Update `src/models/index.ts`:

```typescript
export * from "./analytics.model";
// ... existing exports
```

### **Phase 2: Firebase Configuration & Service**

#### **2.1 Firebase App Configuration**

Create `src/lib/firebase/config.ts`:

```typescript
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// Firebase config - replace with your project config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export const getFirebaseApp = (): FirebaseApp => {
  if (!app && typeof window !== "undefined") {
    app = initializeApp(firebaseConfig);
  }
  return app!;
};

export const getFirestore = (): Firestore => {
  if (!db && typeof window !== "undefined") {
    db = getFirestore(getFirebaseApp());
  }
  return db!;
};
```

#### **2.2 Analytics Service**

Create `src/lib/firebase/analytics.service.ts`:

```typescript
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getFirestore } from "./config";
import type { AnalyticsEvent, EventType, DeviceType } from "../../models";

class AnalyticsService {
  private lastPageView: string | null = null;
  private lastButtonClick: string | null = null;
  private readonly RATE_LIMIT_MS = 1000; // 1 second between same events

  private getDeviceType(): DeviceType {
    if (typeof window === "undefined") return "desktop";

    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  private async writeEvent(
    event: Omit<AnalyticsEvent, "timestamp">,
  ): Promise<void> {
    try {
      if (typeof window === "undefined") return;

      const db = getFirestore();
      const analyticsCollection = collection(db, "analytics_events");

      await addDoc(analyticsCollection, {
        ...event,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      // Silent fail - don't block user experience
      console.warn("Analytics tracking failed:", error);
    }
  }

  async trackPageView(page: string): Promise<void> {
    const now = Date.now();
    const key = `page_view:${page}`;

    // Rate limiting
    if (this.lastPageView === key) {
      return;
    }

    this.lastPageView = key;
    setTimeout(() => {
      if (this.lastPageView === key) {
        this.lastPageView = null;
      }
    }, this.RATE_LIMIT_MS);

    await this.writeEvent({
      eventType: "page_view",
      page,
      device: this.getDeviceType(),
    });
  }

  async trackButtonClick(tag: string, page: string): Promise<void> {
    const now = Date.now();
    const key = `button_click:${tag}:${page}`;

    // Rate limiting
    if (this.lastButtonClick === key) {
      return;
    }

    this.lastButtonClick = key;
    setTimeout(() => {
      if (this.lastButtonClick === key) {
        this.lastButtonClick = null;
      }
    }, this.RATE_LIMIT_MS);

    await this.writeEvent({
      eventType: "button_click",
      page,
      device: this.getDeviceType(),
      tag,
    });
  }
}

export const analytics = new AnalyticsService();

// Export for testing
export { AnalyticsService };
```

#### **2.3 Index File**

Create `src/lib/firebase/index.ts`:

```typescript
export * from "./config";
export * from "./analytics.service";
```

Update `src/lib/index.ts`:

```typescript
export * from "./firebase";
// ... other exports
```

### **Phase 3: Analytics Components**

#### **3.1 Analytics Button Component**

Create `src/components/ui/AnalyticsButton.tsx`:

```typescript
import { component$, type QRL, type Signal, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { clsx } from "clsx";
import { analytics } from "../../lib/firebase";
import type { AnalyticsButtonProps } from "../../models";

export const AnalyticsButton = component$<AnalyticsButtonProps>(
  ({ onClick$, eventTag, class: className, children, ...buttonProps }) => {
    const location = useLocation();

    const handleClick = $(async () => {
      // Track the button click
      try {
        await analytics.trackButtonClick(eventTag, location.url.pathname);
      } catch (error) {
        // Silent fail - don't block user interaction
        console.warn('Button click tracking failed:', error);
      }

      // Execute the original onClick handler
      if (onClick$) {
        await onClick$();
      }
    });

    return (
      <button
        {...buttonProps}
        class={clsx(className)}
        onClick$={handleClick}
      >
        {children}
      </button>
    );
  }
);
```

#### **3.2 Analytics Disclosure Popup**

Create `src/components/ui/AnalyticsNote.tsx`:

```typescript
import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import { clsx } from "clsx";

const STORAGE_KEY = 'analytics_popup_dismissed';

export const AnalyticsNote = component$(() => {
  const isVisible = useSignal(false);

  // Check if popup should be shown
  useTask$(async () => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        isVisible.value = true;
      }
    }
  });

  const handleDismiss = $(() => {
    isVisible.value = false;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  });

  if (!isVisible.value) {
    return null;
  }

  return (
    <div class="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:max-w-md">
      <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <div class="flex items-start space-x-3">
          <div class="flex-1">
            <p class="text-sm text-gray-700">
              We collect anonymous usage data to help improve the site. No personal info is stored.
            </p>
          </div>
          <button
            onClick$={handleDismiss}
            class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss analytics notice"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});
```

#### **3.3 Component Index Files**

Create `src/components/ui/index.ts`:

```typescript
export * from "./AnalyticsButton";
export * from "./AnalyticsNote";
```

Update `src/components/index.ts`:

```typescript
export * from "./ui";
// ... existing exports
```

### **Phase 4: Page View Tracking Integration**

#### **4.1 Analytics Context Provider**

Create `src/contexts/AnalyticsContext.tsx`:

```typescript
import {
  createContextId,
  useContext,
  useContextProvider,
  useTask$,
  $,
  component$,
  Slot,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { analytics } from "../lib/firebase";
import type { AnalyticsContextValue } from "../models";

export const AnalyticsContext = createContextId<AnalyticsContextValue>("analytics-context");

export const AnalyticsProvider = component$(() => {
  const location = useLocation();

  // Track page views on route changes
  useTask$(async ({ track }) => {
    track(() => location.url.pathname);

    try {
      await analytics.trackPageView(location.url.pathname);
    } catch (error) {
      console.warn('Page view tracking failed:', error);
    }
  });

  const contextValue: AnalyticsContextValue = {
    trackPageView: $((page: string) => analytics.trackPageView(page)),
    trackButtonClick: $((tag: string, page: string) => analytics.trackButtonClick(tag, page)),
  };

  useContextProvider(AnalyticsContext, contextValue);

  return <Slot />;
});

export const useAnalytics = (): AnalyticsContextValue => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within AnalyticsProvider");
  }
  return context;
};
```

Update `src/contexts/index.ts`:

```typescript
export * from "./AnalyticsContext";
// ... existing exports
```

#### **4.2 Layout Integration**

Update `src/routes/layout.tsx`:

```typescript
import { component$, Slot } from "@builder.io/qwik";
import { Header, Footer, AnalyticsNote } from "../components";
import { AgeLevelProvider, AnalyticsProvider } from "../contexts";

export default component$(() => {
  return (
    <AgeLevelProvider>
      <AnalyticsProvider>
        <div class="min-h-screen flex flex-col">
          <Header />
          <main class="flex-1 bg-gray-50">
            <Slot />
          </main>
          <Footer />
          <AnalyticsNote />
        </div>
      </AnalyticsProvider>
    </AgeLevelProvider>
  );
});
```

### **Phase 5: Component Updates**

#### **5.1 Update Existing Button Components**

Replace key buttons with `AnalyticsButton`:

**Example - Update ChapterCard navigation:**

```typescript
// In src/components/ChapterCard.tsx
import { AnalyticsButton } from "./ui";

// Replace the div with role="button" with:
<AnalyticsButton
  eventTag={`chapter-card-${chapter.chapter}`}
  onClick$={handleCardClick}
  class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group block w-full text-left"
  onKeyDown$={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  }}
>
  {/* existing card content */}
</AnalyticsButton>
```

**Example - Update AgeLevelToggle buttons:**

```typescript
// In src/components/AgeLevelToggle.tsx
import { AnalyticsButton } from "./ui";

// Replace button elements with:
<AnalyticsButton
  key={level.key}
  eventTag={`age-level-toggle-${level.key}`}
  class={clsx(
    "px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer min-w-0 text-center",
    activeLevel.value === level.key
      ? "bg-primary-500 text-white shadow-md"
      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  )}
  onClick$={() => onLevelChange(level.key)}
>
  {level.label}
</AnalyticsButton>
```

---

## 🔒 **Privacy & Security Implementation**

### **Firestore Security Rules**

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to analytics_events collection
    match /analytics_events/{document} {
      allow read, write: if true; // Public analytics data
    }
  }
}
```

### **Environment Variables**

Create `.env.local` (add to `.gitignore`):

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

Update `src/lib/firebase/config.ts` to use environment variables:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

---

## ✅ **Validation Gates**

Execute these commands to validate implementation:

```bash
# Type checking
npm run build.types

# Build check
npm run build

# Lint check
npm run lint

# Format check
npm run fmt.check

# Preview build locally
npm run preview
```

### **Manual Testing Checklist**

- [ ] Analytics popup appears on first visit only
- [ ] Page views tracked on route navigation
- [ ] Button clicks tracked with correct tags
- [ ] No console errors in browser
- [ ] Firebase console shows events in `analytics_events` collection
- [ ] Rate limiting prevents spam writes
- [ ] Offline mode doesn't break user experience
- [ ] No personal data in tracked events

---

## 🎯 **Implementation Order**

1. **Models First**: Create analytics.model.ts with all interfaces and types
2. **Firebase Setup**: Create config.ts and analytics.service.ts
3. **Service Testing**: Test analytics service independently
4. **UI Components**: Create AnalyticsButton and AnalyticsNote
5. **Context Integration**: Add AnalyticsProvider to layout
6. **Component Updates**: Replace key buttons with AnalyticsButton
7. **Validation**: Run all validation gates and manual testing

---

## 🚨 **Critical Requirements**

- **Never block user experience** - all analytics calls must be non-blocking
- **Silent failure** - if Firebase is unavailable, app continues normally
- **Rate limiting** - prevent spam writes to Firestore
- **SSR safety** - all Firebase calls wrapped in `typeof window !== 'undefined'`
- **TypeScript strict** - no `any` types, full type safety
- **Models in models folder** - all interfaces must be in `src/models/*.model.ts` files
- **Follow existing patterns** - maintain consistency with current codebase architecture

### **🏗️ Architecture Best Practice: Interface Organization**

**CRITICAL RULE**: All TypeScript interfaces and types MUST be placed in the `src/models/` directory following this pattern:

- **File naming**: `feature-name.model.ts` (e.g., `analytics.model.ts`, `user.model.ts`)
- **Centralized exports**: All models exported via `src/models/index.ts`
- **Clean imports**: Use `import type { Interface } from "../models"` throughout the app
- **Separation of concerns**: Keep business logic interfaces separate from component props

**Examples from codebase:**

- `chapter.model.ts` - Chapter, ChapterContent, OverviewContent, HistoryContent
- `svg.model.ts` - BaseSvgProps and SVG component interfaces
- `content-page.model.ts` - ContentPage and related interfaces

**Benefits:**

- **Consistency**: All type definitions in one predictable location
- **Reusability**: Interfaces can be easily shared across components/services
- **Maintainability**: Single source of truth for data structures
- **Import clarity**: Clean, consistent import patterns across the codebase

---

## 🧠 **Confidence Rating: 9/10**

This PRP provides comprehensive implementation details following the exact patterns used in the existing codebase. An AI agent should be able to execute this successfully with the provided context and code examples.

**Potential Edge Cases Covered:**

- SSR safety with window checks
- Firebase initialization timing
- Rate limiting implementation
- Error handling patterns
- TypeScript interface consistency
- Component prop patterns matching existing code

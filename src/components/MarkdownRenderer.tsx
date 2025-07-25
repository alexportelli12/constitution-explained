import { component$ } from "@builder.io/qwik";
import { marked } from "marked";

interface MarkdownRendererProps {
  content: string;
  error?: string;
}

export const MarkdownRenderer = component$<MarkdownRendererProps>(
  ({ content, error }) => {
    if (error) {
      return (
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p class="text-red-600">{error}</p>
          <p class="text-sm text-red-500 mt-2">
            Please check your connection and try again.
          </p>
        </div>
      );
    }

    if (!content) {
      return (
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
            <p class="text-gray-600 text-lg font-medium mb-2">
              Loading content...
            </p>
            <p class="text-gray-500 text-sm">
              Please wait while we fetch the content for you.
            </p>
          </div>
        </div>
      );
    }

    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    // marked.parse returns a string when async: false (default)
    const htmlContent = marked.parse(content) as string;

    return (
      <div class="markdown-content" dangerouslySetInnerHTML={htmlContent} />
    );
  },
);

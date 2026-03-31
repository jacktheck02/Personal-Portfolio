import { createSignal, createUniqueId, Show } from "solid-js";

type ProjectLinkProps = {
  href: string;
  title: string;
  description: string;
  tags: string[];
  children: any;
};

export default function ProjectLink(props: ProjectLinkProps) {
  const [isHovered, setIsHovered] = createSignal(false);
  const [isFocused, setIsFocused] = createSignal(false);
  const isVisible = () => isHovered() || isFocused();
  const tooltipId = createUniqueId();

  return (
    <span
      class="relative inline-block cursor-pointer"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={isVisible() ? tooltipId : undefined}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsFocused(false);
        }}
        class="text-nord-9 hover:text-nord-10 transition-colors duration-200 underline decoration-nord-3 hover:decoration-nord-10 underline-offset-4 font-medium"
      >
        {props.children}
      </a>

      <Show when={isVisible()}>
        <div
          id={tooltipId}
          role="tooltip"
          class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 rounded-lg bg-nord-1 border border-nord-3 shadow-xl z-50 transition-opacity duration-200"
          style={{ "backdrop-filter": "blur(8px)" }}
        >
          <div class="flex items-center space-x-2 mb-2">
            <h3 class="text-nord-6 font-bold">{props.title}</h3>
            <span class="text-nord-4">↗</span>
          </div>
          <p class="text-nord-4 text-sm mb-3 line-clamp-3">
            {props.description}
          </p>
          <div class="flex flex-wrap gap-2">
            {props.tags.map((tag) => (
              <span class="px-2 py-0.5 bg-nord-2 text-nord-9 text-xs rounded-full border border-nord-3">
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow pointing down */}
          <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-nord-3 border-r-8 border-r-transparent"></div>
          <div class="absolute -bottom-1.75 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-nord-1 border-r-8 border-r-transparent"></div>
        </div>
      </Show>
    </span>
  );
}

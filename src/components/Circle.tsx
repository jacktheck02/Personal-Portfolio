import type { JSX } from "solid-js";

type CircleProps = {
  size?: number | string;
  children: JSX.Element;
};

export default function Circle(props: CircleProps) {
	const sizeValue = typeof props.size === "number" ? `${props.size}px` : (props.size ?? "48px");

  return (
    <div class={`relative shrink-0 flex items-center justify-center bg-nord-1 rounded-full overflow-hidden shadow-2xl border-4 border-nord-2`} style={{ width: sizeValue, height: sizeValue }}>
      <div class="absolute inset-0 pointer-events-none bg-linear-to-br from-nord-3 to-transparent opacity-20" />
			{props.children}
    </div>
  );
}
import { Kbd } from "@heroui/react";

/**
 * Renders the QuickFeed shortcut: Cmd+Shift+F
 * Usage: <ShortcutKey /> or <ShortcutKey size="sm" />
 */
interface ShortcutKeyProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ShortcutKey({ size = "md", className = "" }: ShortcutKeyProps) {
  const textSize =
    size === "sm" ? "text-[11px]" : size === "lg" ? "text-[15px]" : "text-[12px]";

  return (
    <span className={`inline-flex items-center gap-1 ${textSize} ${className}`}>
      <Kbd keys={["command"]} classNames={{ base: "bg-white border border-neutral-200 shadow-sm text-neutral-700" }} />
      <span className="text-neutral-400 font-normal">+</span>
      <Kbd classNames={{ base: "bg-white border border-neutral-200 shadow-sm text-neutral-700 font-mono" }}>
        Shift
      </Kbd>
      <span className="text-neutral-400 font-normal">+</span>
      <Kbd classNames={{ base: "bg-white border border-neutral-200 shadow-sm text-neutral-700 font-mono" }}>
        F
      </Kbd>
    </span>
  );
}

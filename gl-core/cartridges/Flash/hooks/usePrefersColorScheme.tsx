// /Users/goldlabel/GitHub/flash/app/src/Flash/hooks/usePrefersColorScheme.tsx
import * as React from "react";

export function usePrefersColorScheme() {
  const getPref = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [mode, setMode] = React.useState<"dark" | "light">(
    typeof window !== "undefined" ? getPref() : "light"
  );

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setMode(mq.matches ? "dark" : "light");

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return mode;
}

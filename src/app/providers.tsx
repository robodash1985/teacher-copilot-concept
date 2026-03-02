"use client";

import { TabProvider } from "@/contexts/TabContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TabProvider>{children}</TabProvider>;
}

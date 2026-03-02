"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FileText, School } from "lucide-react";

export interface AppTab {
  id: string;
  label: string;
  href: string;
  icon: "file-text" | "school";
}

const TAB_TEMPLATES: Record<string, Omit<AppTab, "id">> = {
  "smart-docs": {
    label: "Smart Docs",
    href: "/smart-docs",
    icon: "file-text",
  },
  "education-media": {
    label: "Education Media",
    href: "/education-media",
    icon: "school",
  },
};

interface TabContextType {
  tabs: AppTab[];
  activeTabId: string | null;
  openTab: (templateKey: string) => void;
  closeTab: (tabId: string) => void;
  switchTab: (tabId: string) => void;
}

const TabContext = createContext<TabContextType | null>(null);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [tabs, setTabs] = useState<AppTab[]>([
    { id: "smart-docs", label: "Smart Docs", href: "/smart-docs", icon: "file-text" },
    { id: "education-media", label: "Education Media", href: "/education-media", icon: "school" },
  ]);

  // Derive active tab from current pathname
  const activeTabId = tabs.find((t) => t.href === pathname)?.id ?? null;

  const openTab = useCallback(
    (templateKey: string) => {
      const template = TAB_TEMPLATES[templateKey];
      if (!template) return;

      // If a tab for this route already exists, just navigate to it
      const existing = tabs.find((t) => t.href === template.href);
      if (existing) {
        router.push(existing.href);
        return;
      }

      const newTab: AppTab = {
        id: `${templateKey}-${Date.now()}`,
        ...template,
      };
      setTabs((prev) => [...prev, newTab]);
      router.push(newTab.href);
    },
    [tabs, router]
  );

  const closeTab = useCallback(
    (tabId: string) => {
      const tab = tabs.find((t) => t.id === tabId);
      const isActive = tab?.href === pathname;
      setTabs((prev) => prev.filter((t) => t.id !== tabId));
      if (isActive) {
        router.push("/");
      }
    },
    [tabs, pathname, router]
  );

  const switchTab = useCallback(
    (tabId: string) => {
      const tab = tabs.find((t) => t.id === tabId);
      if (tab) router.push(tab.href);
    },
    [tabs, router]
  );

  return (
    <TabContext.Provider value={{ tabs, activeTabId, openTab, closeTab, switchTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabs() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("useTabs must be used within TabProvider");
  return ctx;
}

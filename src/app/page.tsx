"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import RoutingRulesPage from "@/components/RoutingRulesPage";
import CreateRulePage from "@/components/CreateRulePage";
import type { Rule } from "@/lib/data";
import { initialRules } from "@/lib/data";

type View = "list" | "create" | "edit";

export default function Home() {
  const [view, setView] = useState<View>("list");
  const [editRule, setEditRule] = useState<Rule | null>(null);

  const activeCount = initialRules.filter((r) => r.active).length;

  if (view === "create" || view === "edit") {
    return (
      <div className="min-h-screen bg-[#f5f5f1]">
        <Sidebar activePage="Routing Rules" />
        <CreateRulePage
          editRule={view === "edit" ? editRule : null}
          totalRules={activeCount}
          onCancel={() => { setView("list"); setEditRule(null); }}
          onCreate={() => { setView("list"); setEditRule(null); }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f1]">
      <Sidebar activePage="Routing Rules" />
      <RoutingRulesPage
        onCreateRule={() => setView("create")}
        onEditRule={(rule) => { setEditRule(rule); setView("edit"); }}
      />
    </div>
  );
}

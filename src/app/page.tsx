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
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleCreate(ruleName: string, ruleId: string) {
    const newRule: Rule = {
      id: String(Date.now()),
      ruleId,
      name: ruleName,
      createdDate: new Date().toLocaleString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true,
      }),
      description: "",
      conditions: "Any type of payment",
      gatewayRouting: "Default routing",
      active: true,
    };
    setRules((prev) => [newRule, ...prev.filter((r) => r.active), ...prev.filter((r) => !r.active)]);
    setSuccessMessage(`${ruleName} successfully created`);
    setView("list");
    setEditRule(null);
  }

  function handleEdit(ruleName: string, ruleId: string) {
    setRules((prev) =>
      prev.map((r) =>
        r.id === editRule?.id ? { ...r, name: ruleName, ruleId } : r
      )
    );
    setSuccessMessage(`${ruleName} successfully updated`);
    setView("list");
    setEditRule(null);
  }

  if (view === "create" || view === "edit") {
    return (
      <div className="min-h-screen bg-[#f5f5f1]">
        <Sidebar activePage="Routing Rules" />
        <CreateRulePage
          editRule={view === "edit" ? editRule : null}
          totalRules={rules.filter((r) => r.active).length}
          onCancel={() => { setView("list"); setEditRule(null); }}
          onCreate={view === "edit" ? handleEdit : handleCreate}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f1]">
      <Sidebar activePage="Routing Rules" />
      <RoutingRulesPage
        rules={rules}
        setRules={setRules}
        successMessage={successMessage}
        onDismissSuccess={() => setSuccessMessage(null)}
        onCreateRule={() => setView("create")}
        onEditRule={(rule) => { setEditRule(rule); setView("edit"); }}
      />
    </div>
  );
}

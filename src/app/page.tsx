"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import RoutingRulesPage from "@/components/RoutingRulesPage";
import CreateRulePage from "@/components/CreateRulePage";
import RetrySettingsPage from "@/components/RetrySettingsPage";
import PaymentsHubPage from "@/components/PaymentsHubPage";
import PaymentProcessingPage from "@/components/PaymentProcessingPage";
import AccountUpdaterPage from "@/components/AccountUpdaterPage";
import PaymentRetryRecoveryPage from "@/components/PaymentRetryRecoveryPage";
import FraudPreventionPage from "@/components/FraudPreventionPage";
import type { Rule } from "@/lib/data";
import { initialRules } from "@/lib/data";

type View =
  | "list"
  | "create"
  | "edit"
  | "retry-settings"
  | "payments-hub"
  | "payment-processing"
  | "account-updater"
  | "payment-retry-recovery"
  | "fraud-prevention";

const VIEW_TO_PAGE: Record<View, string> = {
  "list": "Routing Rules",
  "create": "Routing Rules",
  "edit": "Routing Rules",
  "retry-settings": "Retry Settings",
  "payments-hub": "Overview",
  "payment-processing": "Payment Processing",
  "account-updater": "Account Updater",
  "payment-retry-recovery": "Payment Retry Recovery",
  "fraud-prevention": "Fraud Prevention",
};

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

  function handleNavigate(page: string) {
    const map: Record<string, View> = {
      "Routing Rules": "list",
      "Retry Settings": "retry-settings",
      "Overview": "payments-hub",
      "Payment Processing": "payment-processing",
      "Account Updater": "account-updater",
      "Payment Retry Recovery": "payment-retry-recovery",
      "Fraud Prevention": "fraud-prevention",
    };
    const next = map[page];
    if (next) {
      setView(next);
      setEditRule(null);
    }
  }

  const activePage = VIEW_TO_PAGE[view];

  if (view === "create" || view === "edit") {
    return (
      <div className="min-h-screen bg-[#f5f5f1]">
        <Sidebar activePage={activePage} onNavigate={handleNavigate} />
        <CreateRulePage
          editRule={view === "edit" ? editRule : null}
          totalRules={rules.filter((r) => r.active).length}
          onCancel={() => { setView("list"); setEditRule(null); }}
          onCreate={view === "edit" ? handleEdit : handleCreate}
        />
      </div>
    );
  }

  if (view === "retry-settings") {
    return (
      <div className="min-h-screen bg-[#f5f5f1]">
        <Sidebar activePage="Retry Settings" onNavigate={handleNavigate} />
        <RetrySettingsPage />
      </div>
    );
  }

  if (view === "payments-hub") {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Sidebar activePage="Overview" onNavigate={handleNavigate} />
        <PaymentsHubPage />
      </div>
    );
  }

  if (view === "payment-processing") {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Sidebar activePage="Payment Processing" onNavigate={handleNavigate} />
        <PaymentProcessingPage />
      </div>
    );
  }

  if (view === "account-updater") {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Sidebar activePage="Account Updater" onNavigate={handleNavigate} />
        <AccountUpdaterPage />
      </div>
    );
  }

  if (view === "payment-retry-recovery") {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Sidebar activePage="Payment Retry Recovery" onNavigate={handleNavigate} />
        <PaymentRetryRecoveryPage />
      </div>
    );
  }

  if (view === "fraud-prevention") {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Sidebar activePage="Fraud Prevention" onNavigate={handleNavigate} />
        <FraudPreventionPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f1]">
      <Sidebar activePage="Routing Rules" onNavigate={handleNavigate} />
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

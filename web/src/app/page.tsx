"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ExploreSection } from "@/components/explore-section"
import { DashboardSection } from "@/components/dashboard-section"
import { WalletProvider } from "@/components/wallet-provider"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<"explore" | "dashboard">("explore")

  return (
    <WalletProvider>
      <div className="min-h-screen bg-accent">
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

        <main className="pt-16 transition-all duration-300">
          <div className="p-4 lg:p-8">{activeSection === "explore" ? <ExploreSection /> : <DashboardSection />}</div>
        </main>
      </div>
    </WalletProvider>
  )
}

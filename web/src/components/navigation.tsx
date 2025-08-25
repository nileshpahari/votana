"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/components/wallet-provider"
import { Search, BarChart3, Wallet, Menu, X, Vote } from "lucide-react"
import { totalCandidates, totalPolls } from "@/lib/data"

interface NavigationProps {
  activeSection: "explore" | "dashboard"
  onSectionChange: (section: "explore" | "dashboard") => void
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isConnected, walletAddress, connectWallet, disconnectWallet } = useWallet()

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black shadow-lg">
        <div className="max-w-80% mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary border-4 border-black shadow-md flex items-center justify-center">
                <Vote className="h-6 w-6 text-white font-bold" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-mono text-black tracking-wider">VOTANA</h1>
                <p className="text-xs text-muted-foreground font-bold tracking-wide">DECENTRALIZED VOTING</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant={activeSection === "explore" ? "default" : "outline"}
                className={`brutalist-button ${
                  activeSection === "explore"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-black hover:bg-muted"
                }`}
                onClick={() => onSectionChange("explore")}
              >
                <Search className="h-4 w-4 mr-2" />
                EXPLORE
              </Button>

              <Button
                variant={activeSection === "dashboard" ? "default" : "outline"}
                className={`brutalist-button ${
                  activeSection === "dashboard"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-black hover:bg-muted"
                }`}
                onClick={() => onSectionChange("dashboard")}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                DASHBOARD
              </Button>
            </div>

            {/* Stats and Wallet Section */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-4 px-4 py-2 bg-muted border-2 border-black">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-black">POLLS:</span>
                  <Badge className="brutalist-badge bg-secondary text-secondary-foreground">{totalPolls}</Badge>
                </div>
                <div className="w-px h-4 bg-black" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-black">VOTES:</span>
                  <span className="text-xs font-bold text-black font-mono">{totalCandidates}</span>
                </div>
              </div>

              {/* Wallet Connection */}
              {isConnected ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border-4 border-black shadow-md">
                  <div className="w-6 h-6 bg-green-500 border-2 border-black flex items-center justify-center">
                    <Wallet className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black">PHANTOM</p>
                    <p className="text-xs text-black font-mono">{formatWalletAddress(walletAddress!)}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={disconnectWallet}
                    className="ml-2 text-xs brutalist-button bg-white text-black hover:bg-red-100"
                  >
                    DISCONNECT
                  </Button>
                </div>
              ) : (
                <Button onClick={connectWallet} className="brutalist-button bg-green-400 text-black hover:bg-green-300">
                  <Wallet className="h-4 w-4 mr-2" />
                  CONNECT WALLET
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMobileMenu}
                className="brutalist-button bg-white text-black"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t-4 border-black">
            <div className="px-4 py-4 space-y-3">
              <Button
                variant={activeSection === "explore" ? "default" : "outline"}
                className={`w-full justify-start brutalist-button ${
                  activeSection === "explore" ? "bg-primary text-primary-foreground" : "bg-white text-black"
                }`}
                onClick={() => {
                  onSectionChange("explore")
                  setIsMobileMenuOpen(false)
                }}
              >
                <Search className="h-4 w-4 mr-2" />
                EXPLORE
              </Button>

              <Button
                variant={activeSection === "dashboard" ? "default" : "outline"}
                className={`w-full justify-start brutalist-button ${
                  activeSection === "dashboard" ? "bg-accent text-accent-foreground" : "bg-white text-black"
                }`}
                onClick={() => {
                  onSectionChange("dashboard")
                  setIsMobileMenuOpen(false)
                }}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                DASHBOARD
              </Button>

              {/* Mobile Wallet */}
              <div className="pt-2 border-t-2 border-black">
                {isConnected ? (
                  <div className="p-3 bg-green-100 border-2 border-black">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="h-4 w-4 text-black" />
                      <span className="text-sm font-bold text-black">PHANTOM CONNECTED</span>
                    </div>
                    <p className="text-xs text-black font-mono mb-2">{formatWalletAddress(walletAddress!)}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={disconnectWallet}
                      className="w-full text-xs brutalist-button bg-white text-black"
                    >
                      DISCONNECT
                    </Button>
                  </div>
                ) : (
                  <Button onClick={connectWallet} className="w-full brutalist-button bg-green-400 text-black">
                    <Wallet className="h-4 w-4 mr-2" />
                    CONNECT WALLET
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  walletAddress: string | null
  connectWallet: () => void
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  // Simulate wallet connection with dummy data
  const connectWallet = () => {
    // Simulate connecting to Phantom wallet
    const dummyAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
    setWalletAddress(dummyAddress)
    setIsConnected(true)
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setIsConnected(false)
  }

  // Auto-connect on mount for demo purposes
  useEffect(() => {
    connectWallet()
  }, [])

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

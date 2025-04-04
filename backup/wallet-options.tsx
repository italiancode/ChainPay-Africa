"use client"

import { useState, useEffect } from "react"
import { useConnect, useAccount, useDisconnect, Connector } from "wagmi"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, ChevronRight, CheckCircle, XCircle, X } from "lucide-react"
import Image from "next/image"

export function WalletOptions() {
  const { connectors, connect, error, isPending } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "success" | "error">("idle")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Track connection status based on isPending
  useEffect(() => {
    if (selectedConnector) {
      if (isPending) {
        setConnectionStatus("connecting")
      } else if (error) {
        setConnectionStatus("error")
      } else if (!isPending && connectionStatus === "connecting") {
        setConnectionStatus("success")
        setTimeout(() => {
          setIsModalOpen(false)
          setConnectionStatus("idle")
          setSelectedConnector(null)
        }, 1500)
      }
    }
  }, [isPending, error, selectedConnector, connectionStatus])

  const handleConnect = async (connector: Connector) => {
    setSelectedConnector(connector.uid)
    setConnectionStatus("connecting")
    try {
      connect({ connector })
      // Let the useEffect handle the status changes based on isPending
    } catch (err) {
      console.error("Connection error:", err)
      setConnectionStatus("error")
    }
  }

  // Format address to show first 6 and last 4 characters
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  if (!isClient) {
    return (
      <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-400">
        <Wallet className="w-5 h-5" />
      </button>
    )
  }

  return (
    <>
      {isConnected ? (
        <div className="relative">
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#0099FF] to-[#0066FF] text-white hover:opacity-90 active:scale-95 transition-all duration-200"
            aria-label="Wallet options"
          >
            <Wallet className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {isDetailsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-100"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Connected Wallet</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsDetailsOpen(false)
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 text-sm font-mono text-gray-700 bg-gray-50 p-2 rounded">
                    {address && formatAddress(address)}
                  </div>
                </div>
                <div className="p-3">
                  <button
                    onClick={() => {
                      disconnect()
                      setIsDetailsOpen(false)
                    }}
                    className="w-full p-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors text-center"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none ${
            isPending
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#0099FF] to-[#0066FF] text-white hover:opacity-90 active:scale-95"
          }`}
          aria-label="Connect wallet"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Wallet className="w-5 h-5" />
          )}
        </button>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#0099FF]" />
                  Connect Wallet
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {connectors.map((connector) => (
                    <motion.button
                      key={connector.uid}
                      onClick={() => handleConnect(connector)}
                      disabled={isPending}
                      className={`w-full p-3 flex items-center justify-between rounded-lg transition-colors focus:outline-none ${
                        selectedConnector === connector.uid
                          ? "bg-[#0099FF]/5 border border-[#0099FF]"
                          : "hover:bg-gray-50 border border-gray-100"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={connector.icon || "/next.svg"}
                          alt={`${connector.name} logo`}
                          width={32}
                          height={32}
                          className="w-6 h-6 rounded-md"
                        />
                        <span className="font-medium text-gray-700">
                          {connector.name}
                          {isPending && selectedConnector === connector.uid && " (Connecting...)"}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {connectionStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 border-t border-gray-100"
                  >
                    {connectionStatus === "connecting" && (
                      <div className="flex items-center text-[#0099FF]">
                        <motion.div
                          className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        />
                        Connecting...
                      </div>
                    )}
                    {connectionStatus === "success" && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Connected successfully
                      </div>
                    )}
                    {connectionStatus === "error" && (
                      <div className="flex items-center text-red-600">
                        <XCircle className="w-4 h-4 mr-2" />
                        Connection failed
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {error && <div className="p-4 border-t border-gray-100 text-red-600 text-sm">{error.message}</div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


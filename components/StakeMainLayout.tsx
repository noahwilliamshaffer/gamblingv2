'use client'

import { useState } from 'react'
import StakeHeader from './StakeHeader'
import StakeSidebar from './StakeSidebar'

interface StakeMainLayoutProps {
  children: React.ReactNode
}

export default function StakeMainLayout({ children }: StakeMainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      {/* Header */}
      <StakeHeader onMenuToggle={toggleSidebar} isMobileMenuOpen={sidebarOpen} />
      
      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar - Always visible on desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <StakeSidebar isOpen={true} onClose={() => {}} />
        </div>
        
        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <StakeSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 
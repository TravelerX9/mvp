import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
          AETHER
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">
            Services
          </Link>
          <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="#contact">
            <Button variant="secondary" size="sm">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

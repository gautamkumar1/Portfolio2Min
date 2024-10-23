'use client'

import { Github, Sun, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/ui/button"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" />
            </svg>
            <span className="text-2xl font-bold">tailus</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a className="text-gray-600 hover:text-gray-900" href="#">
              Guide
            </a>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              Templates
            </a>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              Blocks
            </a>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              Snippets
            </a>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Github className="w-6 h-6" />
            <Sun className="w-6 h-6" />
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col space-y-4 px-4 py-6 bg-gray-50">
              <a className="text-gray-600 hover:text-gray-900" href="#">
                Guide
              </a>
              <a className="text-gray-600 hover:text-gray-900" href="#">
                Templates
              </a>
              <a className="text-gray-600 hover:text-gray-900" href="#">
                Blocks
              </a>
              <a className="text-gray-600 hover:text-gray-900" href="#">
                Snippets
              </a>
              <div className="flex items-center space-x-4 pt-4">
                <Github className="w-6 h-6" />
                <Sun className="w-6 h-6" />
              </div>
            </nav>
          </div>
        )}
      </header>
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Easy to customize
          <br />
          Modern Tailwindcss
          <br />
          <span className="relative">
            Templates
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></span>
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">High Page Speed - Accessible - Fully Responsive</p>
        <div className="flex justify-center space-x-4">
          <Button size="lg">Browse</Button>
          <Button variant="outline" size="lg">
            Affiliates
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </div>
      </main>
    </div>
  )
}
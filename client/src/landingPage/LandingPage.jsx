import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0C0A09] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-[90%] md:max-w-4xl text-center space-y-6 md:space-y-8">
        {/* Heading with responsive font sizes and padding */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-400 to-green-400 text-transparent bg-clip-text px-2">
          Build Your Portfolio in Just 2 Minutes!
        </h1>

        {/* Subheading with responsive text and width */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-2">
          Effortlessly create a stunning portfolio and showcase your talents instantly with our intuitive generator!
        </p>

        {/* Button container with improved responsive layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 px-2">
          {/* Primary Button - Made responsive with consistent width */}
          <button className="relative block group w-full sm:w-48">
            <span className="absolute inset-0 bg-indigo-500 rounded-lg"></span>
            <div className="relative bg-zinc-950 border-2 border-indigo-500 rounded-lg transition-all duration-200 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
              <div className="px-4 sm:px-6 py-3">
                <p className="text-base sm:text-lg font-semibold text-white whitespace-nowrap">
                  Get Started
                </p>
              </div>
            </div>
          </button>

          {/* Secondary Button - Made responsive with consistent width */}
          <button className="w-full sm:w-48 bg-zinc-950 text-zinc-300 border border-zinc-700 border-b-4 font-medium overflow-hidden relative px-4 sm:px-6 py-3 rounded-lg hover:brightness-110 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <span className="bg-zinc-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            <span className="text-base sm:text-lg whitespace-nowrap">Learn More</span>
          </button>
        </div>
      </div>
    </div>
  )
}
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Button } from "../../components/ui/button";
import Input from "../../components/ui/Input";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0C0A09]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#18181B] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div>
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Welcome to Portfolio2Min
            </h2>

            <form>
              <Input
                icon={Mail}
                type="email"
                placeholder="Enter your email"
                name="email"
              />

              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                name="password"
              />

              <div className="mt-4">
                <Button
                  variant="secondary"
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-400 to-green-500 text-white hover:from-teal-500 hover:to-cyan-600"
                >
                  Let's Go
                </Button>
              </div>
            </form>
          </div>

          {/* "Don't have an account?" Section */}
          <div className="px-8 py-4 bg-[#121112] bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-green-400 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

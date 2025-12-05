import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Terminal,
  Code2,
  ShieldCheck,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-600 font-sans selection:bg-stone-200">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center shadow-lg shadow-stone-900/20">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-stone-900 tracking-tight">
              MailBridge
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-500">
            <a
              href="#features"
              className="hover:text-stone-900 transition-colors"
            >
              Features
            </a>
            <a href="#docs" className="hover:text-stone-900 transition-colors">
              Documentation
            </a>
            <a
              href="https://github.com/ShreyNagda"
              className="hover:text-stone-900 transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-lg shadow-stone-900/25"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-stone-500 hover:text-stone-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-6 py-4 space-y-4">
            <a
              href="#features"
              className="block text-stone-500 hover:text-stone-900"
            >
              Features
            </a>
            <Link
              to="/login"
              className="block text-stone-500 hover:text-stone-900"
            >
              Sign In
            </Link>
            <Link to="/register" className="block text-stone-900 font-semibold">
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: The Pitch */}
        <div className="space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-stone-900 animate-pulse"></span>
              No Backend Required
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              Collect Leads from your{" "}
              <span className="text-stone-600">Static Site.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-500 max-w-lg leading-relaxed mt-6">
              Stop building servers just to send emails. Use our secure API to
              route contact form submissions directly to your inbox.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/register"
              className="px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-stone-900/25 flex items-center justify-center gap-2 group"
            >
              Start for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#docs"
              className="px-8 py-4 bg-white border border-stone-200 hover:border-stone-400 text-stone-600 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4 text-stone-500" />
              Read Docs
            </a>
          </motion.div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-stone-900" />
              <span>Zod Validation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-stone-900" />
              <span>Spam Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-stone-900" />
              <span>Instant Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Column: The Code Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative lg:ml-auto w-full max-w-lg"
        >
          {/* Background Glow */}
          <div className="absolute -inset-1 bg-stone-200 rounded-2xl blur-2xl opacity-50"></div>

          {/* Code Window */}
          <div className="relative bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-stone-950 border-b border-stone-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
              </div>
              <div className="ml-2 text-xs text-stone-500 font-mono">
                contact-form.ts
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed">
                <code className="block text-stone-300">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">sendEmail</span> ={" "}
                  <span className="text-purple-400">async</span> (data) ={">"}{" "}
                  {"{"}
                  {"\n"} <span className="text-purple-400">await</span> fetch(
                  <span className="text-emerald-400">
                    "https://api.mailbridge.dev/send"
                  </span>
                  , {"{"}
                  {"\n"} method:{" "}
                  <span className="text-emerald-400">"POST"</span>,{"\n"}{" "}
                  headers: {"{"}{" "}
                  <span className="text-emerald-400">"Content-Type"</span>:{" "}
                  <span className="text-emerald-400">"application/json"</span>{" "}
                  {"}"},{"\n"} body: JSON.
                  <span className="text-blue-400">stringify</span>({"{"}
                  {"\n"} email: data.email,
                  {"\n"} message: data.message,
                  {"\n"} clientId:{" "}
                  <span className="text-emerald-400">"portfolio-v1"</span>
                  {"\n"} {"}"}){"\n"} {"}"});
                  {"\n"}
                  {"}"}
                </code>
              </pre>
            </div>
            <div className="bg-stone-950/50 px-6 py-3 border-t border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-500">POST /send-email</span>
              <span className="text-xs text-emerald-400 font-mono">200 OK</span>
            </div>
          </div>

          {/* Floating Success Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 bg-white border border-stone-200 p-4 rounded-xl shadow-xl hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-stone-900" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">
                  Email Sent
                </div>
                <div className="text-xs text-stone-500">To: you@gmail.com</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-stone-100 border-t border-stone-200"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-stone-500 font-semibold tracking-wide uppercase text-sm mb-3">
              Why MailBridge?
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Enterprise-grade email handling for your side projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-stone-200 transition-colors">
                <ShieldCheck className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Spam Protection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Built-in rate limiting per IP and strict CORS configuration
                ensuring only your trusted domains can send data.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-stone-200 transition-colors">
                <Zap className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Instant Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We utilize optimized Nodemailer transports with Gmail SMTP to
                ensure your leads land in your primary inbox instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-stone-200 transition-colors">
                <Code2 className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Type-Safe API
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Full TypeScript support and Zod validation on the backend means
                you never receive malformed or empty data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center shadow-lg shadow-stone-900/20">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-xl font-bold text-stone-900 tracking-tight">
                  MailBridge
                </span>
              </div>
              <p className="text-stone-500 text-sm max-w-md leading-relaxed">
                The simplest way to add email functionality to your static
                sites. No backend required.
              </p>
            </div>

            {/* Links Column */}
            <div>
              <h3 className="text-stone-900 font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <a
                  href="#features"
                  className="text-stone-500 hover:text-stone-900 text-sm block transition-colors"
                >
                  Features
                </a>
                <Link
                  to="/docs"
                  className="text-stone-500 hover:text-stone-900 text-sm block transition-colors"
                >
                  Documentation
                </Link>
                <Link
                  to="/register"
                  className="text-stone-500 hover:text-stone-900 text-sm block transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-stone-900 font-semibold mb-4">Connect</h3>
              <div className="space-y-2">
                <a
                  href="https://github.com/ShreyNagda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-500 hover:text-stone-900 text-sm block transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="mailto:contact@mailbridge.dev"
                  className="text-stone-500 hover:text-stone-900 text-sm block transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-500 text-sm">
              © {new Date().getFullYear()} MailBridge. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-stone-500">
              <a
                href="#privacy"
                className="hover:text-stone-900 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="hover:text-stone-900 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

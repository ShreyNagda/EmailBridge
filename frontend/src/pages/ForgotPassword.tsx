import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      if (data.success) {
        setStatus("success");
        toast.success("Password reset email sent! Check your inbox.");
      }
    } catch (error: any) {
      setStatus("error");
      toast.error(
        error.response?.data?.message || "Failed to send reset email"
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center">
            <Mail className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-stone-900 tracking-tight">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-stone-500">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-stone-200 sm:rounded-lg sm:px-10">
          {status === "success" ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 mb-4">
                <Check className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-medium text-stone-900">
                Check your email
              </h3>
              <p className="mt-2 text-sm text-stone-500">
                We have sent a password reset link to your email address.
              </p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="focus:ring-stone-500 focus:border-stone-500 block w-full pl-10 sm:text-sm bg-stone-50 border-stone-300 rounded-md py-2 text-stone-900 placeholder-stone-400"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg shadow-stone-900/10 text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transition-all ${
                    status === "loading" ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {status === "loading" ? "Sending..." : "Send Reset Link"}
                </button>
              </div>

              <div className="flex items-center justify-center">
                <Link
                  to="/login"
                  className="flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  User,
  Globe,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    targetEmails: "",
    clientId: "",
  });
  const [useLoginEmail, setUseLoginEmail] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseLoginEmail(e.target.checked);
    if (e.target.checked) {
      setFormData((prev) => ({ ...prev, targetEmails: prev.email }));
    } else {
      setFormData((prev) => ({ ...prev, targetEmails: "" }));
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", {
        email: formData.email,
        password: formData.password,
      });
      if (data.success) {
        // Log user in temporarily to get token for next step
        login({
          _id: data._id,
          email: data.email,
          clientId: "", // Not set yet
          targetEmails: [], // Not set yet
          allowedOrigins: [], // Not set yet
          isVerified: false,
          isAcceptingEmails: true,
        });
        toast.success("Account created! Please verify your email.");
        setStep(2);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const emails = formData.targetEmails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email);

      const { data } = await api.put("/auth/profile", {
        targetEmails: emails,
        clientId: formData.clientId,
      });
      if (data.success) {
        // Update user context with full profile
        login({
          _id: data._id,
          email: data.email,
          clientId: data.clientId,
          targetEmails: data.targetEmails,
          allowedOrigins: data.allowedOrigins || [],
          isVerified: data.isVerified,
          isAcceptingEmails: data.isAcceptingEmails,
        });
        toast.success("Profile setup complete!");
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Profile setup failed");
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
          {step === 1 ? "Create your account" : "Setup your profile"}
        </h2>
        <p className="mt-2 text-center text-sm text-stone-500">
          {step === 1
            ? "Get started with your free account"
            : "Configure your email service settings"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-stone-200 sm:rounded-lg sm:px-10">
          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleStep1Submit}>
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
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-stone-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="focus:ring-stone-500 focus:border-stone-500 block w-full pl-10 pr-10 sm:text-sm bg-stone-50 border-stone-300 rounded-md py-2 text-stone-900 placeholder-stone-400"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-stone-400 hover:text-stone-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-stone-400 hover:text-stone-500" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg shadow-stone-900/10 text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transition-all"
                >
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleStep2Submit}>
              <div>
                <label
                  htmlFor="clientId"
                  className="block text-sm font-medium text-stone-700"
                >
                  Client ID (Unique identifier)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    id="clientId"
                    name="clientId"
                    type="text"
                    required
                    pattern="[a-zA-Z0-9_-]+"
                    title="Only letters, numbers, hyphens, and underscores allowed"
                    className="focus:ring-stone-500 focus:border-stone-500 block w-full pl-10 sm:text-sm bg-stone-50 border-stone-300 rounded-md py-2 text-stone-900 placeholder-stone-400"
                    placeholder="my-awesome-site"
                    value={formData.clientId}
                    onChange={(e) => {
                      // Only allow URL-safe characters
                      const value = e.target.value.replace(
                        /[^a-zA-Z0-9_-]/g,
                        ""
                      );
                      setFormData({ ...formData, clientId: value });
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-stone-500">
                  This will be your API endpoint: /api/
                  {formData.clientId || "..."}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="targetEmails"
                    className="block text-sm font-medium text-stone-700"
                  >
                    Target Emails (Comma separated)
                  </label>
                  <div className="flex items-center">
                    <input
                      id="useLoginEmail"
                      name="useLoginEmail"
                      type="checkbox"
                      className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded"
                      checked={useLoginEmail}
                      onChange={handleSwitchChange}
                    />
                    <label
                      htmlFor="useLoginEmail"
                      className="ml-2 block text-xs text-stone-500"
                    >
                      Use login email
                    </label>
                  </div>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    id="targetEmails"
                    name="targetEmails"
                    type="text"
                    required
                    disabled={useLoginEmail}
                    className={`focus:ring-stone-500 focus:border-stone-500 block w-full pl-10 sm:text-sm border-stone-300 rounded-md py-2 border ${
                      useLoginEmail
                        ? "bg-stone-100 text-stone-500"
                        : "bg-stone-50 text-stone-900 placeholder-stone-400"
                    }`}
                    placeholder="contact@yourbusiness.com, support@yourbusiness.com"
                    value={formData.targetEmails}
                    onChange={handleChange}
                  />
                </div>
                <p className="mt-1 text-xs text-stone-500">
                  Enter multiple emails separated by commas.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg shadow-emerald-500/20 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                >
                  Complete Setup <Check className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {step === 1 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-stone-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-stone-300 rounded-md shadow-sm text-sm font-medium text-stone-700 bg-white hover:bg-stone-50 transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;

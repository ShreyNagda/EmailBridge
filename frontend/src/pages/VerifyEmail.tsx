import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/axios";
import { CheckCircle, XCircle, Loader } from "lucide-react";

import { toast } from "react-toastify";

const attemptedTokens = new Set<string>();

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token || attemptedTokens.has(token)) return;
    attemptedTokens.add(token);

    const verify = async () => {
      try {
        const { data } = await api.get(`/auth/verify-email/${token}`);
        if (data.success) {
          setStatus("success");
          setMessage(data.message);
          toast.success("Email verified successfully!");
        }
      } catch (error: any) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed");
        toast.error(error.response?.data?.message || "Verification failed");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-stone-200 sm:rounded-lg sm:px-10 text-center">
          {status === "loading" && (
            <div className="flex flex-col items-center">
              <Loader className="h-12 w-12 text-stone-900 animate-spin mb-4" />
              <h2 className="text-xl font-medium text-stone-900">
                Verifying your email...
              </h2>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-emerald-500 mb-4" />
              <h2 className="text-xl font-medium text-stone-900 mb-2">
                Email Verified!
              </h2>
              <p className="text-stone-500 mb-6">{message}</p>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-lg shadow-stone-900/10 text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center">
              <XCircle className="h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-xl font-medium text-stone-900 mb-2">
                Verification Failed
              </h2>
              <p className="text-stone-500 mb-6">{message}</p>
              <Link
                to="/login"
                className="text-stone-600 hover:text-stone-900 font-medium transition-colors"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

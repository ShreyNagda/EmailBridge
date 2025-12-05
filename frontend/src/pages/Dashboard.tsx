import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Copy,
  Check,
  Trash2,
  Book,
  Settings,
  Shield,
  AlertTriangle,
  Menu,
  X,
  Mail,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import api from "../lib/axios";
import { toast } from "react-toastify";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";

const Dashboard = () => {
  const { user, logout, login, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "security" | "danger">(
    "general"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Verification State
  const [verificationLoading, setVerificationLoading] = useState(false);

  // Delete Account Dialog State
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Test Email State
  const [sendingTestEmail, setSendingTestEmail] = useState(false);

  // Delete Item Dialog State
  const [showDeleteItemDialog, setShowDeleteItemDialog] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState<
    "email" | "origin" | null
  >(null);
  const [deleteItemValue, setDeleteItemValue] = useState<string>("");

  // Logout Dialog State
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    clientId: "",
    targetEmails: "",
    allowedOrigins: "",
    isAcceptingEmails: true,
  });

  useEffect(() => {
    if (user) {
      setEditFormData({
        clientId: user.clientId || "",
        targetEmails: user.targetEmails?.join(", ") || "",
        allowedOrigins: user.allowedOrigins?.join(", ") || "",
        isAcceptingEmails: user.isAcceptingEmails ?? true,
      });
    }
  }, [user]);

  useEffect(() => {
    refreshUser();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const emails = editFormData.targetEmails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email);

      const origins = editFormData.allowedOrigins
        .split(",")
        .map((origin) => origin.trim())
        .filter((origin) => origin);

      const { data } = await api.put("/auth/profile", {
        clientId: editFormData.clientId,
        targetEmails: emails,
        allowedOrigins: origins,
        isAcceptingEmails: editFormData.isAcceptingEmails,
      });

      if (data.success) {
        login({
          ...user!,
          clientId: data.clientId,
          targetEmails: data.targetEmails,
          allowedOrigins: data.allowedOrigins,
          isAcceptingEmails: data.isAcceptingEmails,
        });
        setIsEditing(false);
        toast.success("Profile updated successfully");
      }
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleToggleAcceptingEmails = async () => {
    try {
      const newValue = !editFormData.isAcceptingEmails;
      const { data } = await api.put("/auth/profile", {
        clientId: user?.clientId,
        targetEmails: user?.targetEmails,
        allowedOrigins: user?.allowedOrigins,
        isAcceptingEmails: newValue,
      });

      if (data.success) {
        setEditFormData((prev) => ({ ...prev, isAcceptingEmails: newValue }));
        login({
          ...user!,
          isAcceptingEmails: newValue,
        });
        toast.success(
          newValue ? "Now accepting emails" : "Stopped accepting emails"
        );
      }
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  const handleResendVerification = async () => {
    setVerificationLoading(true);
    try {
      await api.post("/auth/resend-verification");
      toast.success("Verification email sent!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to send verification email"
      );
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      await api.delete("/auth/me");
      logout();
      navigate("/");
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!deleteItemType || !deleteItemValue) return;

    try {
      let updatedEmails = user?.targetEmails || [];
      let updatedOrigins = user?.allowedOrigins || [];

      if (deleteItemType === "email") {
        updatedEmails = updatedEmails.filter(
          (email) => email !== deleteItemValue
        );
        if (updatedEmails.length === 0) {
          toast.error(
            "Cannot delete all target emails. At least one is required."
          );
          setShowDeleteItemDialog(false);
          return;
        }
      } else if (deleteItemType === "origin") {
        updatedOrigins = updatedOrigins.filter(
          (origin) => origin !== deleteItemValue
        );
      }

      const { data } = await api.put("/auth/profile", {
        clientId: user?.clientId,
        targetEmails: updatedEmails,
        allowedOrigins: updatedOrigins,
        isAcceptingEmails: user?.isAcceptingEmails,
      });

      if (data.success) {
        login({
          ...user!,
          targetEmails: data.targetEmails,
          allowedOrigins: data.allowedOrigins,
        });
        toast.success(
          `${
            deleteItemType === "email" ? "Email" : "Origin"
          } deleted successfully`
        );
      }
    } catch (error: any) {
      console.error("Failed to delete item:", error);
      toast.error(error.response?.data?.message || "Failed to delete item");
    } finally {
      setShowDeleteItemDialog(false);
      setDeleteItemType(null);
      setDeleteItemValue("");
    }
  };

  const openDeleteItemDialog = (type: "email" | "origin", value: string) => {
    setDeleteItemType(type);
    setDeleteItemValue(value);
    setShowDeleteItemDialog(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTestEmail = async () => {
    if (!user) return;
    setSendingTestEmail(true);
    try {
      await api.post(`/${user.clientId}`, {
        name: "Test User",
        email: "test@example.com",
        message: "This is a test email from your dashboard.",
        subject: "Test Email from Dashboard",
      });
      toast.success("Test email sent successfully!");
    } catch (error: any) {
      console.error("Failed to send test email:", error);
      toast.error(error.response?.data?.message || "Failed to send test email");
    } finally {
      setSendingTestEmail(false);
    }
  };

  if (!user) return null;

  const endpointUrl = `${window.location.origin}/api/${user.clientId}`;
  const isOnlyOneEmail = (user?.targetEmails?.length || 0) <= 1;

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row text-stone-800">
      {/* Mobile Header */}
      <div className="md:hidden bg-stone-50 shadow-sm p-4 flex justify-between items-center border-b border-stone-200">
        <h1 className="text-xl font-bold text-stone-900">Dashboard</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-stone-600 hover:text-stone-900"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarCollapsed ? "4rem" : "16rem",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`bg-stone-50 shrink-0 border-r border-stone-200 hidden md:block relative`}
      >
        <div className="h-full flex flex-col">
          {!isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
              <p className="text-sm text-stone-500 mt-1">{user.email}</p>
            </motion.div>
          )}

          {isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 flex justify-center"
            >
              <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
            </motion.div>
          )}

          <nav className="flex-1 px-4 space-y-2 py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center text-sm font-medium rounded-md transition-colors ${
                    isSidebarCollapsed
                      ? "justify-center w-10 h-10 mx-auto p-0"
                      : "w-full px-4 py-3"
                  } ${
                    activeTab === tab.id
                      ? "bg-stone-200 text-stone-900"
                      : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                  title={isSidebarCollapsed ? tab.label : ""}
                >
                  <Icon
                    className={`h-5 w-5 ${isSidebarCollapsed ? "" : "mr-3"}`}
                  />
                  {!isSidebarCollapsed && tab.label}
                </motion.button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-stone-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowLogoutDialog(true)}
              className={`flex items-center text-sm font-medium text-red-500 hover:bg-red-50 rounded-md transition-colors ${
                isSidebarCollapsed
                  ? "justify-center w-10 h-10 mx-auto p-0"
                  : "w-full px-4 py-3"
              }`}
              title={isSidebarCollapsed ? "Logout" : ""}
            >
              <LogOut
                className={`h-5 w-5 ${isSidebarCollapsed ? "" : "mr-3"}`}
              />
              {!isSidebarCollapsed && "Logout"}
            </motion.button>
          </div>

          {/* Collapse Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-10 bg-stone-900 text-white p-1.5 rounded-full shadow-lg hover:bg-stone-800 transition-colors hidden md:block"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-64 bg-stone-50 border-l border-stone-200 md:hidden shadow-2xl"
          >
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-stone-900">Menu</h1>
                    <p className="text-xs text-stone-500 mt-1">{user.email}</p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-stone-500 hover:text-stone-900 p-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <nav className="flex-1 px-4 space-y-2 py-4 overflow-y-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? "bg-stone-200 text-stone-900"
                          : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.label}
                    </motion.button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-stone-200">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowLogoutDialog(true);
                  }}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </motion.button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header Actions */}
          <div className="flex justify-end mb-6">
            <Link
              to="/docs"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-lg shadow-stone-900/10 text-white bg-stone-900 hover:bg-stone-800 transition-all"
            >
              <Book className="h-4 w-4 mr-2" />
              Documentation
            </Link>
          </div>

          {/* Content Area */}
          <Card
            key={activeTab}
            noPadding
            disableAnimation
            className="bg-stone-50 shadow-xl border border-stone-200 rounded-lg overflow-hidden"
          >
            {activeTab === "general" && (
              <div className="p-6 space-y-6">
                {!user.isVerified && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-md p-4 mb-6">
                    <div className="flex">
                      <div className="shrink-0">
                        <Mail
                          className="h-5 w-5 text-yellow-500"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Email Verification Required
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Your email address has not been verified. You need
                            to verify your email to ensure full access to all
                            features.
                          </p>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={handleResendVerification}
                            disabled={verificationLoading}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          >
                            {verificationLoading
                              ? "Sending..."
                              : "Resend Verification Email"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                  <div>
                    <h2 className="text-lg font-medium text-stone-900">
                      General Settings
                    </h2>
                    <p className="text-sm text-stone-500">
                      Manage your API configuration.
                    </p>
                  </div>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Settings
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div>
                      <Input
                        label="Client ID"
                        type="text"
                        value={editFormData.clientId}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            clientId: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Input
                        label="Target Emails"
                        type="text"
                        value={editFormData.targetEmails}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            targetEmails: e.target.value,
                          })
                        }
                        helperText="Comma separated email addresses."
                      />
                    </div>
                    <div>
                      <Input
                        label="Allowed Origins"
                        type="text"
                        value={editFormData.allowedOrigins}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            allowedOrigins: e.target.value,
                          })
                        }
                        placeholder="https://example.com"
                        helperText="Comma separated URLs. Leave empty to allow all."
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                ) : (
                  <dl className="space-y-6">
                    <div>
                      <dt className="text-sm font-medium text-stone-500 mb-2">
                        Client ID
                      </dt>
                      <dd className="text-sm text-stone-900 bg-stone-100 px-4 py-3 rounded-md border border-stone-200">
                        {user.clientId}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-stone-500 mb-2">
                        Target Emails
                      </dt>
                      <dd className="text-sm text-stone-900">
                        {user.targetEmails?.length ? (
                          <div className="flex flex-wrap gap-2">
                            {user.targetEmails.map((email, i) => (
                              <div
                                key={i}
                                className="inline-flex items-center bg-stone-200 border border-stone-300 px-3 py-1.5 rounded-full text-sm"
                              >
                                <span className="text-stone-700">{email}</span>
                                <button
                                  onClick={() =>
                                    openDeleteItemDialog("email", email)
                                  }
                                  disabled={isOnlyOneEmail}
                                  className={`ml-2 p-0.5 rounded-full transition-colors ${
                                    isOnlyOneEmail
                                      ? "text-stone-400 cursor-not-allowed opacity-50"
                                      : "text-red-500 hover:text-red-600 hover:bg-red-100"
                                  }`}
                                  title={
                                    isOnlyOneEmail
                                      ? "Cannot delete last email"
                                      : "Delete email"
                                  }
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-stone-500 italic">
                            No emails configured
                          </span>
                        )}
                        {user.targetEmails && user.targetEmails.length > 0 && (
                          <div className="mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleSendTestEmail}
                              isLoading={sendingTestEmail}
                              icon={Send}
                            >
                              Send Test Email
                            </Button>
                          </div>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-stone-500 mb-2">
                        Allowed Origins
                      </dt>
                      <dd className="text-sm text-stone-900">
                        {user.allowedOrigins?.length ? (
                          <div className="flex flex-wrap gap-2">
                            {user.allowedOrigins.map((origin, i) => (
                              <div
                                key={i}
                                className="inline-flex items-center bg-stone-200 border border-stone-300 px-3 py-1.5 rounded-full text-sm max-w-full"
                              >
                                <span className="text-stone-700 truncate">
                                  {origin}
                                </span>
                                <button
                                  onClick={() =>
                                    openDeleteItemDialog("origin", origin)
                                  }
                                  className="ml-2 p-0.5 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors shrink-0"
                                  title="Delete origin"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-stone-500 italic">
                            All origins allowed
                          </span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-stone-500 mb-2">
                        API Endpoint
                      </dt>
                      <dd className="flex text-sm text-stone-700 bg-stone-100 p-3 rounded-md border border-stone-200 items-center justify-between">
                        <code className="break-all">{endpointUrl}</code>
                        <button
                          onClick={() => copyToClipboard(endpointUrl)}
                          className="ml-4 p-2 rounded-md hover:bg-stone-200 focus:outline-none transition-colors shrink-0"
                        >
                          {copied ? (
                            <Check className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <Copy className="h-5 w-5 text-stone-500" />
                          )}
                        </button>
                      </dd>
                    </div>
                  </dl>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-stone-900 mb-4">
                  Security Settings
                </h2>
                <p className="text-stone-600 text-sm">
                  Password change functionality is coming soon.
                </p>
              </div>
            )}

            {activeTab === "danger" && (
              <div className="p-6 space-y-8">
                <div>
                  <h2 className="text-lg font-medium text-red-600 mb-4">
                    Danger Zone
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-red-700">
                          Stop Accepting Emails
                        </h3>
                        <p className="text-sm text-red-600 mt-1">
                          Temporarily disable your API endpoint. Requests will
                          be rejected.
                        </p>
                      </div>
                      <button
                        onClick={handleToggleAcceptingEmails}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                          editFormData.isAcceptingEmails
                            ? "bg-emerald-500"
                            : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            editFormData.isAcceptingEmails
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <h3 className="text-sm font-medium text-stone-900">
                    Delete Account
                  </h3>
                  <p className="text-sm text-stone-600 mt-1">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                  <Button
                    variant="danger"
                    onClick={() => setShowDeleteDialog(true)}
                    icon={Trash2}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>

      {/* Delete Account Dialog */}
      <Dialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Delete Account"
        type="danger"
      >
        <div>
          <p className="text-sm text-stone-500 mb-4">
            Are you absolutely sure you want to delete your account? This action
            cannot be undone and will permanently remove all your data and
            disable your API endpoint.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteAccount}
              isLoading={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Yes, Delete Account"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Delete Item Dialog */}
      <Dialog
        isOpen={showDeleteItemDialog}
        onClose={() => setShowDeleteItemDialog(false)}
        title={`Delete ${deleteItemType === "email" ? "Email" : "Origin"}`}
        type="danger"
      >
        <div>
          <p className="text-sm text-stone-500 mb-4">
            Are you sure you want to delete this{" "}
            {deleteItemType === "email" ? "target email" : "allowed origin"}?
          </p>
          <div className="bg-stone-100 px-3 py-2 rounded-md mb-4">
            <code className="text-sm text-stone-800 break-all">
              {deleteItemValue}
            </code>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteItemDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteItem}>
              Yes, Delete
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        title="Logout"
        type="warning"
      >
        <div>
          <p className="text-sm text-stone-500 mb-4">
            Are you sure you want to logout?
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowLogoutDialog(false);
                handleLogout();
              }}
            >
              Yes, Logout
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Dashboard;

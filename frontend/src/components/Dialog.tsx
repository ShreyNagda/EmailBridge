import React from "react";
import { DialogPanel, Dialog as HeadlessDialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: "info" | "danger" | "warning";
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  type = "info",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <HeadlessDialog
          static
          className="relative z-50"
          onClose={onClose}
          open={isOpen}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/20 backdrop-blur-md"
            aria-hidden="true"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-md"
              >
                <DialogPanel
                  className={`w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${
                    type === "danger" ? "border-t-4 border-red-500" : ""
                  } ${
                    type === "warning" ? "border-t-4 border-yellow-500" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <HeadlessDialog.Title
                      as="h3"
                      className={`text-lg font-medium leading-6 ${
                        type === "danger"
                          ? "text-red-600"
                          : type === "warning"
                          ? "text-yellow-600"
                          : "text-stone-900"
                      }`}
                    >
                      {title}
                    </HeadlessDialog.Title>
                    <button
                      onClick={onClose}
                      className="text-stone-400 hover:text-stone-500 focus:outline-none transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-2">{children}</div>
                </DialogPanel>
              </motion.div>
            </div>
          </div>
        </HeadlessDialog>
      )}
    </AnimatePresence>
  );
};

export default Dialog;

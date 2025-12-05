import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  noPadding?: boolean;
  disableAnimation?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  noPadding = false,
  disableAnimation = false,
  ...props
}) => {
  const animationProps = disableAnimation
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
      {...animationProps}
      className={`bg-white shadow-xl border border-stone-200 rounded-lg overflow-hidden ${
        noPadding ? "" : "p-6"
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

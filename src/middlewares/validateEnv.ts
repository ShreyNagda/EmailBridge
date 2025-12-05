import dotenv from "dotenv";

dotenv.config();

export const validateEnv = () => {
  const requiredEnv = ["EMAIL_USER", "EMAIL_APP_PASSWORD", "ALLOWED_ORIGINS"];
  const missingEnv = requiredEnv.filter((env) => !process.env[env]);

  if (missingEnv.length > 0) {
    console.error(
      `Missing required environment variables: ${missingEnv.join(", ")}`
    );
    process.exit(1);
  }
};

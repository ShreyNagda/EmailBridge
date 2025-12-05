import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { validateEnv } from "./middlewares/validateEnv";

const PORT = process.env.PORT || 3000;

import { transporter } from "./config/email";

// Validate Environment Variables
validateEnv();

// Verify Email Connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Connection Established Successfully");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

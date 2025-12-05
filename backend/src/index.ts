import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { validateEnv } from "./middlewares/validateEnv";

const PORT = process.env.PORT || 3000;

// Validate Environment Variables
validateEnv();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

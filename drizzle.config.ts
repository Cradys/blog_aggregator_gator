import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/config.ts"

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: readConfig().dbUrl,
  },
});
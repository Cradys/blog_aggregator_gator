import { drizzle } from "drizzle-orm/postgres-js";

import { readConfig } from "../config";

const config = readConfig();
export const db = drizzle(config.dbUrl);
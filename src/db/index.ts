import { drizzle } from "drizzle-orm/postgres-js";

import { relations } from "./schema";
import { readConfig } from "../config";

const config = readConfig();
export const db = drizzle(config.dbUrl, { relations });
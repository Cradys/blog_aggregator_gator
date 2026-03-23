import os from "os"
import fs from "fs"
import path from "path";

const CONFIG_FILE = path.join(os.homedir(), ".gatorconfig.json")


export type Config = {
  dbUrl: string,
  currentUserName: string
}


export function setUser(name: string): Config {
  const conf = readConfig()
  conf.currentUserName = name
  
  writeConfig(conf)
  return conf
}

export function readConfig() {
  try {
    const content = fs.readFileSync(CONFIG_FILE, {
      encoding: "utf-8"
    })
    const parsed = JSON.parse(content)

    return validateConfig(parsed)

  } catch (err) {
    throw new Error((err as Error).message)
  }
}

function validateConfig(rawConfig: any) {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("db_url is required in config file");
  }
  if (
    !rawConfig.current_user_name ||
    typeof rawConfig.current_user_name !== "string"
  ) {
    throw new Error("current_user_name is required in config file");
  }

  const config: Config = {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name,
  };

  return config;
}

export function writeConfig(conf: Config) {
  try {
    const config_json = {
      db_url: conf.dbUrl,
      current_user_name: conf.currentUserName
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config_json))

    return 
    
  } catch (err) {
    throw new Error((err as Error).message)
  }
}
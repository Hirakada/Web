import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import process from "node:process";

const npmCommand = process.platform === "win32" ? (process.env.ComSpec ?? "cmd.exe") : "npm";
const apps = ["web", "portfolio"];
const children = apps.map((app) => {
  const command = process.platform === "win32" ? ["/d", "/s", "/c", "npm run dev"] : ["run", "dev"];
  const child = spawn(npmCommand, command, {
    cwd: fileURLToPath(new URL(`../apps/${app}/`, import.meta.url)),
    stdio: "inherit",
    shell: false,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      console.error(`${app} stopped with signal ${signal}`);
    } else if (code && code !== 0) {
      console.error(`${app} stopped with exit code ${code}`);
    }
  });

  return child;
});

const stopChildren = () => {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
};

process.on("SIGINT", () => {
  stopChildren();
  process.exit(0);
});
process.on("SIGTERM", () => {
  stopChildren();
  process.exit(0);
});

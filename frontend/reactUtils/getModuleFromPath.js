import { modules } from "./modules";

export function getModuleFromPath(pathname) {
  if (pathname === "/") return "main";

  const mod = modules.find(
    (m) => pathname === m.path || pathname.startsWith(m.path + "/")
  );
  return mod?.name.toLowerCase() || "main";
}

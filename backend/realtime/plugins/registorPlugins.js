import { connectionPlugin } from "./connection.plugin.js";
import { chatPlugin } from "./chat.plugin.js";
import { presencePlugin } from "./presence.plugin.js";

export function registerPlugins(io, socket) {
  try {
    connectionPlugin(io, socket);
    presencePlugin(io, socket);
    chatPlugin(io, socket);
  } catch (err) {}
}
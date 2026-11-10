import cookie from "cookie";
import { verifyAccessToken } from "../../utils/token.utils.js";

export const socketAuth = (socket, next) => {
  try {
    let token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token && socket.handshake.headers?.cookie) {
      const parsed = cookie.parse(socket.handshake.headers.cookie);
      token = parsed.accessToken || parsed.token;
    }

    if (!token || typeof token !== "string") {
      const err = new Error("Unauthorized");
      err.data = { code: "AUTH_FAILED" };
      return next(err);
    }

    const payload = verifyAccessToken(token);

    if (!payload?.id) {
      const err = new Error("Unauthorized");
      err.data = { code: "INVALID_TOKEN" };
      return next(err);
    }

    socket.data.user = {
      id: payload.id,
      role: payload.role,
      profile: payload.profile || null,
      shop: payload.shop || null,
      provider: payload.provider || null
    };

    next();

  } catch (err) {
    const error = new Error("Unauthorized");
    error.data = { code: "AUTH_FAILED" };
    return next(error);
  }
};
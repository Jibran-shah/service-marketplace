import { UnauthorizedError, ForbiddenError } from "../../errors/index.js";

export const requireAuth = (socket) => {
  if (!socket.data?.user?.id) {
    throw new UnauthorizedError("Authentication required");
  }
};

export const requireRole = (roles = []) => {
  return (socket) => {
    requireAuth(socket);

    if (!roles.includes(socket.data?.user?.role)) {
      throw new ForbiddenError("Insufficient permissions");
    }
  };
};

export const requireProfile = (socket) => {
  requireAuth(socket);

  if (!socket.data?.user?.profile) {
    throw new ForbiddenError("user must have created profile");
  }
};

export const requireShop = (socket) => {
  requireAuth(socket);

  if (!socket.data?.user?.shop) {
    throw new ForbiddenError("user must be shop");
  }
};

export const requireProvider = (socket) => {
  requireAuth(socket);

  if (!socket.data?.user?.provider) {
    throw new ForbiddenError("user must be provider");
  }
};


export const requireAnyProfile = (socket) => {
  requireAuth(socket);

  if (
    !socket.data?.user?.profile &&
    !socket.data?.user?.shop &&
    !socket.data?.user?.provider
  ) {
    throw new ForbiddenError("User must have created profile");
  }
};

export const requireShopOrProvider = (socket) => {
  requireAuth(socket);

  if (
    !socket.data?.user?.shop &&
    !socket.data?.user?.provider
  ) {
    throw new ForbiddenError(
      "user must be shop or provider"
    );
  }
};

export const combineGuards = (...guards) => {
  return (socket) => {
    for (const guard of guards) {
      guard(socket);
    }
  };
};
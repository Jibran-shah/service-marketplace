import { verifyAccessToken } from "../utils/token.utils.js";
import { UnauthorizedError, ForbiddenError } from "../errors/index.js";

export const protect = ({
  profile = false,
  shop = false,
  provider = false
} = {}) => {
  
  return (req, res, next) => {

    try {
      const token =
        req.cookies?.accessToken ||
        req.headers?.authorization?.split(" ")[1];

      if (!token) {
        return next(new UnauthorizedError("Access token missing"));
      }

      const payload = verifyAccessToken(token);

      req.user = {
        id: payload.id,
        role: payload.role,
        profile: payload.profile || null,
        shop: payload.shop || null,
        provider: payload.provider || null
      };

      console.log(payload)

      if (profile && !req.user.profile) {
        return next(new ForbiddenError("profile not complete"));
      }

      if (shop && !req.user.shop) {
        return next(new ForbiddenError("Not a shop"));
      }

      if (provider && !req.user.provider) {
        return next(new ForbiddenError("Not a provider"));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};


export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ForbiddenError("Access forbidden: insufficient permissions")
      );
    }
    next();
  };
};
import { BadRequestError } from "../errors/index.js";

/**
 * Creates per-field media upload context for multer uploads.
 *
 * Result:
 * req.mediaContext = {
 *   avatar: {
 *     usageType: "profile",
 *     namespace: "users",
 *     owner: "userId"
 *   }
 * }
 *
 * @param {Object} options
 * @param {Object} options.fields - Field configuration keyed by multer field name.
 * @param {"user"|"params"|"body"} [options.ownerFrom="user"] - Owner source.
 * @param {string} [options.ownerField="id"] - Owner property name.
 * @returns {Function} Express middleware.
 */
export const mediaContext = ({
  fields = {},
  ownerFrom = "user",
  ownerField = "id",
}) => {
  return (req, res, next) => {

    try {
      let owner = null;

      if (ownerFrom === "user") {
        owner = req.user?.[ownerField];
      } else if (ownerFrom === "params") {
        owner = req.params?.[ownerField];
      } else if (ownerFrom === "body") {
        owner = req.body?.[ownerField];
      }

      if (!owner) {
        return next(new BadRequestError("Media context owner not found"));
      }

      if (!req.files || typeof req.files !== "object") {
        req.mediaContext = {};
        return next();
      }

      req.mediaContext = {};

      for (const fieldName of Object.keys(req.files)) {
        const fieldConfig = fields[fieldName];

        if (!fieldConfig) continue;

        req.mediaContext[fieldName] = {
          usageType: fieldConfig.usageType,
          namespace: fieldConfig.namespace,
          owner,
        };
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
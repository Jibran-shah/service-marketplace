import { BadRequestError } from "../errors/index.js";

export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const payload = req[property];
    if (payload === undefined || payload === null) {
      return next(
        new BadRequestError(
          `${property} is required but was not provided`
        )
      );
    }

    if (property === "body" && typeof payload !== "object") {
      return next(
        new BadRequestError("Request body must be a valid JSON object")
      );
    }

    const { error, value } = schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
        type: d.type,
        received: d.context?.value,
      }));

      errors.forEach((e) => {
        console.log(e);
      });

      return next(new BadRequestError("Validation failed", errors));
    }


    req.validated = req.validated || {};
    req.validated[property] = value;

    next();
  };
};
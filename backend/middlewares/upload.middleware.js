import multer from "multer";
import { BadRequestError } from "../errors/index.js";
import { MAX_SIZE_CAP } from "../constants/media.constants.js";
import { validateFile } from "../utils/media/media.validators.js";
import { normalizeFiles } from "../utils/media/media.normalizers.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_SIZE_CAP,
  },
});

const isMultipart = (req) =>
  (req.headers["content-type"] || "")
    .toLowerCase()
    .startsWith("multipart/form-data");

/**
 * Creates multipart upload middleware.
 *
 * Each field can define:
 * - name
 * - maxCount
 * - required
 * - maxSize
 * - types
 *
 * Files are validated, normalized, and stored in req.media.
 */
export const createUpload = ({ fields = [] } = {}) => {
  return (req, res, next) => {
    if (!isMultipart(req)) return next();

    const multerFields = fields.map((field) => ({
      name: field.name,
      maxCount: field.maxCount ?? 10,
    }));

    upload.fields(multerFields)(req, res, (err) => {
      if (err) return next(err);

      req.media = {};

      try {
        for (const field of fields) {
          const rawFiles = req.files?.[field.name] || [];
          const validatedFiles = [];

          for (const file of rawFiles) {
            validateFile(file, field);
            validatedFiles.push(file);
          }
          

          const finalFiles = normalizeFiles(validatedFiles);

          if (field.required && finalFiles.length === 0) {
            throw new BadRequestError(`${field.name} is required`);
          }
          
          req.media[field.name] = finalFiles;
        }

        next();
      } catch (err) {
        next(err);
      }
    });
  };
};
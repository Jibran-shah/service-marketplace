import mongoose from "mongoose";

import { BadRequestError, NotFoundError } from "../errors/index.js";

import {
  CATEGORY_HIERARCHY_LEVEL,
  CATEGORY_HIERARCHY_LEVEL_ARRAY,
  CATEGORY_APPLIES_TO,
  CATEGORY_APPLIES_TO_ARRAY,
} from "../constants/category.constants.js";

import { MODELS } from "../constants/models.constants.js";


const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.CATEGORY,
      default: null,
      index: true,
    },

    path: {
      type: String,
      required: true,
    },

    depth: {
      type: Number,
      default: 0,
      index: true,
    },

    hierarchyLevel: {
      type: String,
      enum: CATEGORY_HIERARCHY_LEVEL_ARRAY,
      default: CATEGORY_HIERARCHY_LEVEL.ROOT,
      index: true,
    },

    appliesTo: {
      type: [String],
      enum: CATEGORY_APPLIES_TO_ARRAY,
      default: [
        CATEGORY_APPLIES_TO.PRODUCT,
        CATEGORY_APPLIES_TO.SERVICE,
      ],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("validate", async function () {

  this.slug = generateSlug(this.name);

  if (!this.parentCategory) {
    setCategoryHierarchy(this);
    return;
  }

  const parent = await this.constructor.findById(this.parentCategory);

  if (!parent) {
    throw new NotFoundError("Parent category not found");
  }

  if (parent.path.split("/").includes(this.slug)) {
    throw new BadRequestError(
      "Category name already exists in this hierarchy branch"
    );
  }

  setCategoryHierarchy(this, parent);
});

categorySchema.pre("save", async function () {

  if (!this.isModified("name")) return;

  const old = await this.constructor.findById(this._id);
  if (!old) return;

  const oldPath = old.path;

  this.slug = generateSlug(this.name);

  const parent = this.parentCategory
    ? await this.constructor.findById(this.parentCategory)
    : null;

  if (this.parentCategory && !parent) {
    throw new NotFoundError("Parent category not found");
  }

  this.path = getCategoryPath(parent, this.slug);
  this.depth = parent ? parent.depth + 1 : 0;

  const safeOldPath = escapeRegex(oldPath);

  await this.constructor.updateMany(
    { path: { $regex: `^${safeOldPath}/` } },
    [
      {
        $set: {
          path: {
            $concat: [
              this.path,
              {
                $substrCP: [
                  "$path",
                  oldPath.length,
                  { $strLenCP: "$path" },
                ],
              },
            ],
          },
        },
      },
    ]
  );
});

categorySchema.index(
  { slug: 1, parentCategory: 1 },
  { unique: true }
);

categorySchema.index({ path: 1 });

export const Category = mongoose.model(MODELS.CATEGORY, categorySchema);




const generateSlug = (name) =>
  name.toLowerCase().trim().replace(/\s+/g, "-");

const escapeRegex = (str) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getHierarchyLevel = (depth) => {
  if (depth === 0) return CATEGORY_HIERARCHY_LEVEL.ROOT;
  if (depth === 1) return CATEGORY_HIERARCHY_LEVEL.CATEGORY;

  return CATEGORY_HIERARCHY_LEVEL.SUBCATEGORY;
};

const getCategoryPath = (parent, slug) =>
  parent ? `${parent.path}/${slug}` : slug;

const setCategoryHierarchy = (category, parent = null) => {
  category.depth = parent ? parent.depth + 1 : 0;
  category.path = getCategoryPath(parent, category.slug);
  category.hierarchyLevel = getHierarchyLevel(category.depth);
};
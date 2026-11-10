export const CATEGORY_HIERARCHY_LEVEL = Object.freeze({
  ROOT: "root",
  CATEGORY: "category",
  SUBCATEGORY: "subcategory"
});

export const CATEGORY_HIERARCHY_LEVEL_ARRAY = Object.freeze(
  Object.values(CATEGORY_HIERARCHY_LEVEL)
);

export const CATEGORY_APPLIES_TO = Object.freeze({
  PRODUCT: "Product",
  SERVICE: "Service",
  PROVIDER:"Provider",
  SHOP:"Shop"
});

export const CATEGORY_APPLIES_TO_ARRAY = Object.freeze(
  Object.values(CATEGORY_APPLIES_TO)
);
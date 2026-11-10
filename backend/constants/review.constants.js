import { MODELS } from "./models.constants.js";

export const REVIEW_ENTITYS = Object.freeze({
    PRODUCT:MODELS.PRODUCT,
    SHOP:MODELS.SHOP,
    PROVIDER:MODELS.PROVIDER,
    SERVICE:MODELS.SERVICE
});

export const REVIEW_ENTITYS_ARRAY = Object.freeze(Object.values(REVIEW_ENTITYS));
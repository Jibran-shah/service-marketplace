export const REFPORT_STATUS = Object.freeze({
  PENDING:"pending",
  REVIEWED:"reviewed",
  RESOLVED:"resolved",
  REJECTED:"rejected"
});

export const REFPORT_STATUSES_ARRAY = Object.freeze(Object.keys( REFPORT_STATUS ));

export const REPORT_ENTITY = {
  USER: MODELS.USER,
  PRODUCT: MODELS.PRODUCT,
  MESSAGE: MODELS.MESSAGE,
};

export const REPORT_ENTITIES_ARRAY = Object.freeze(Object.keys( REPORT_ENTITY ));
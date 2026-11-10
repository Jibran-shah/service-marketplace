export const BOOKING_STATUS =Object.freeze({
    REQUESTED: "requested",
    ACCEPTED: "accepted",
    CANCELLED: "cancelled",
    COMPLETED: "completed",
    PAYED:"payed"
});

export const BOOKING_STATUS_ARRAY = Object.freeze(Object.values(BOOKING_STATUS));
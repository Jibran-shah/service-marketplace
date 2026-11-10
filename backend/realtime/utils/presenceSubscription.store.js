import { EVENTS } from "../constants/events.constants.js";

class PresenceSubscriptionStore {

  channel(userId) {
    return `presence:subscribers:${userId}`;
  }

  subscribe(socket, userId) {
    socket.join(this.channel(userId));
  }

  unsubscribe(socket, userId) {
    socket.leave(this.channel(userId));
  }

  emit(io, userId, event, data = {}) {
    io.to(this.channel(userId)).emit(event, {
      userId,
      timestamp: Date.now(),
      ...data
    });
  }

  emitOnline(io, userId, data = {}) {
    this.emit(io, userId, EVENTS.PRESENCE.ONLINE, data);
  }

  emitOffline(io, userId, data = {}) {
    this.emit(io, userId, EVENTS.PRESENCE.OFFLINE, data);
  }

  cleanup(socket, userId) {
    socket.leave(this.channel(userId));
  }
}

export const presenceSubscriptions = new PresenceSubscriptionStore();
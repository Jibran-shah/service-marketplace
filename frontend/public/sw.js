self.addEventListener("push", (event) => {
  const data = event.data.json();

  self.registration.showNotification(
    data.title,
    {
      body: data.message,
      icon: "/logo192.png",
      badge: "/badge.png",
      data: {
        url: data.url,
      },
    }
  );
});

self.addEventListener(
  "notificationclick",
  (event) => {
    event.notification.close();

    event.waitUntil(
      clients.openWindow(
        event.notification.data.url
      )
    );
  }
);
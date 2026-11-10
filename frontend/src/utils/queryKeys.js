export const queryKeys = {

  auth: {
    all: ["auth"],

    init: () => ["auth", "init"],

    me: () => ["auth", "me"],
    user:(id) => ["auth","user",id]
  },

  user: {
    all: ["user"],

    profile: (id) => ["user", "profile", id],
  },

  profile: {
    all: ["profile"],

    buyer: {
      all: ["profile", "buyer"],

      me: () => ["profile", "buyer", "me"],

      byId: (id) => ["profile", "buyer", id],

      list: (filters = {}) => ["profile", "buyer", "list", filters],
    },
    fullProfile: (id)=>["full-profile", id]
  },

  services: {
    all: ["services"],
    list: (filters) => ["services", "list", filters || {}],
    detail: (id) => ["services", "detail", id],
    my: () => ["services", "me"],
    category: (id) => ["services", "category", id]
  },

  cart: {
    all: ["cart"],

    detail: () => ["cart", "detail"],

    items: () => ["cart", "items"],
  },

  checkout: {
    all: ["checkout"],

    create: () => ["checkout", "create"],
  },


  
  buyerOrders: {
    all: ["buyerOrders"],

    list: (filters = {}) => ["buyerOrders", "list", filters],

    detail: (id) => ["buyerOrders", "detail", id],

    my: (filters = {}) => ["buyerOrders", "my", filters],
  },

  shopOrders: {
    all: ["shopOrders"],

    list: (filters = {}) => ["shopOrders", "list", filters],

    detail: (id) => ["shopOrders", "detail", id],

    my: (filters = {}) => ["shopOrders", "my", filters],
  },

  bookings: {
    all: ["bookings"],
    my: (params) => ["bookings", "my", params],
    detail: (id) => ["bookings", "detail", id]
  },

  wallet: {
    all: ["wallet"],
    me: () => ["wallet", "me"],
    transactions: {
      all: ["wallet", "transactions"],
      list: (filters) => ["wallet", "transactions", "list", filters || {}],
      detail: (id) => ["wallet", "transactions", id]
    }
  },

  withdraw: {
    all: ["withdraw"],
    my: () => ["withdraw", "my"],
    detail: (id) => ["withdraw", "detail", id]
  },


  payments: {
    all: ["payments"],

    list: (filters = {}) => ["payments", "list", filters],

    detail: (id) => ["payments", "detail", id],

    create: () => ["payments", "create"],

    webhook: () => ["payments", "webhook"],
  },

  chat: {
    all: ["chat"],

    conversations: () => ["chat", "conversations"],

    conversation: (id) => ["chat", "conversation", id],

    messages: (conversationId, page = 1) => [
      "chat",
      "messages",
      conversationId,
      page,
    ],

    unread: () => ["chat", "unread"],
  },

  provider: {
    all: ["provider"],

    list: (filters = {}) => [
      "provider",
      "list",
      filters
    ],

    detail: (id) => [
      "provider",
      "detail",
      id
    ],

    me: () => [
      "provider",
      "me"
    ]
  },

  shop: {
    all: ["shop"],
    list: () => ["shop", "list"],
    detail: (id) => ["shop", "detail", id],
    me: () => ["shop", "me"]
  },

  products: {
    all: ["products"],
    list: (filters) => ["products", "list", filters],
    detail: (id) => ["products", "detail", id],
    byCategory: (id) => ["products", "category", id],
    shop: () => ["products", "shop"]
  },


  categories: {
    all: ["categories"],
    list: (params) => ["categories", "list", params],
    detail: (id) => ["categories", "detail", id],
    tree: (params) => ["categories", "tree", params]
  },

  directChat: {
    all: ["directChat"],
    list: () => ["directChat", "list"],
    detail: (chatId) => ["directChat", "detail", chatId]
  },
  groupChat: {
    all: ["groupChat"],
    list: () => ["groupChat", "list"],
    detail: (groupId) => ["groupChat", "detail", groupId],
    members: (groupId) => ["groupChat", "members", groupId]
  },

  messages: {
    all: ["messages"],
    chat: (chatId) => ["messages", "chat", chatId]
  },

  reviews: {
    all: ["reviews"],

    list: (filters = {}) => ["reviews", "list", filters],

    detail: (id) => ["reviews", "detail", id],

    my: (filters = {}) => ["reviews", "me", filters],

    entity: (entityType, entityId, filters = {}) => [
      "reviews",
      "entity",
      entityType,
      entityId,
      filters
    ],
  },

  ui: {
    all: ["ui"],
  },
};
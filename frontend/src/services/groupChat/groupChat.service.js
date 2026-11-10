import axios from "../axios";



const groupChatApi = {
  createGroup: (data) =>
    axios.post("/group-chats", data),

  getUserGroups: () =>
    axios.get("/group-chats"),

  getGroupById: (groupId) =>
    axios.get(`/group-chats/${groupId}`),

  addMembers: (groupId, data) =>
    axios.post(`/group-chats/${groupId}/members`, data),

  removeMember: (groupId, data) =>
    axios.delete(`/group-chats/${groupId}/members`, { data }),

  leaveGroup: (groupId) =>
    axios.post(`/group-chats/${groupId}/leave`),

  updateGroup: (groupId, data) =>
    axios.patch(`/group-chats/${groupId}`, data),

  changeRole: (groupId, data) =>
    axios.patch(`/group-chats/${groupId}/members/role`, data),

  deleteGroup: (groupId) =>
    axios.delete(`/group-chats/${groupId}`)
};


export const groupChatService = {
  createGroup: async (data) => {
    const res = await groupChatApi.createGroup(data);
    return res.data.data;
  },

  getUserGroups: async () => {
    const res = await groupChatApi.getUserGroups();
    return res.data.data;
  },

  getGroupById: async (groupId) => {
    const res = await groupChatApi.getGroupById(groupId);
    return res.data.data;
  },

  addMembers: async ({ groupId, members }) => {
    const res = await groupChatApi.addMembers(groupId, { members });
    return res.data.data;
  },

  removeMember: async ({ groupId, memberId }) => {
    const res = await groupChatApi.removeMember(groupId, { memberId });
    return res.data.data;
  },

  leaveGroup: async (groupId) => {
    const res = await groupChatApi.leaveGroup(groupId);
    return res.data.data;
  },

  updateGroup: async ({ groupId, data }) => {
    const res = await groupChatApi.updateGroup(groupId, data);
    return res.data.data;
  },

  changeRole: async ({ groupId, memberId, role }) => {
    const res = await groupChatApi.changeRole(groupId, {
      memberId,
      role
    });
    return res.data.data;
  },

  deleteGroup: async (groupId) => {
    const res = await groupChatApi.deleteGroup(groupId);
    return res.data.data;
  }
};
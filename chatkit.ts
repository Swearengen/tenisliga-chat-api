const Chatkit = require('@pusher/chatkit-server')

export const chatkit = {
    instance: new Chatkit.default({
        instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
        key: process.env.CHATKIT_INSTANCE_KEY,
    }),

    createUser: async function({name, id, avatarURL, customData}) {
        return await this.instance.createUser({id, name, avatarURL, customData})
    },

    updateUser: async function(user) {
        return await this.instance.updateUser(user)
    },

    createUsers: async function(users) {
        return await this.instance.createUsers({users})
    },

    deleteUser: async function(userId) {
        return await this.instance.deleteUser({userId})
    },

    getUser: async function(id) {
        return await this.instance.getUser({id})
            .then((res) => res)
            .catch((res) => {
                if (res.error === 'services/chatkit/not_found/user_not_found') {
                    console.log(res);
                    return undefined
                } else {
                    throw res.error;
                }
            })
    },

    createRoom: async function(room) {
        return await this.instance.createRoom(room)
    },

    getUserRooms: async function(userId) {
        return await this.instance.getUserRooms({userId})
            .then((res) => res)
    },

    getPublicRooms: async function() {
        return await this.instance.getRooms({})
            .then((res) => res)
    },

    deleteRoom: async function(id) {
        return await this.instance.deleteRoom({id})
    },

    getReadCursorsForUser: async function(userId) {
        return await this.instance.getReadCursorsForUser({userId})
            .then((res) => res)
    },

    addUsersToGeneralRoom: async function(userIds) {
        return await this.instance.addUsersToRoom({
            roomId: process.env.GENERAL_ROOM_ID,
            userIds
        })
    },

    authenticate: async function (userId) {
        return await this.instance.authenticate({userId})
    },

    envVarTest: () => {
        return process.env.GENERAL_ROOM_ID
    }
}
import { chatkit } from '../chatkit'
import { allowAccesOrigin } from './utils';

export const createUser = async (event) => {
    const json = JSON.parse(event.body)

    return await chatkit.createUser({
        name: json.name,
        id: json.id,
        avatarURL: json.avatarURL,
        customData: json.customData,
    })
    .then((user) => {
        return chatkit.addUsersToGeneralRoom([user.id])
    })
    .then(() => {
        return {
            statusCode: 200,
            headers: allowAccesOrigin,
            body: "success"
        }
    })
    .catch((e) => {
        return {
            statusCode: 500,
            headers: allowAccesOrigin,
            body: e
        }
    })

}

export const updateUser = async (event) => {
    const json = JSON.parse(event.body)

    return await chatkit.updateUser(json)
    .then(() => {
        return {
            statusCode: 200,
            headers: allowAccesOrigin,
            body: "success"
        }
    })
    .catch((e) => {
        return {
            statusCode: 500,
            headers: allowAccesOrigin,
            body: e
        }
    })

}

export const deleteUser = async (event) => {
    const json = JSON.parse(event.body)

    return await chatkit.deleteUser(json.id)
    .then(() => {
        return {
            statusCode: 200,
            headers: allowAccesOrigin,
            body: "success"
        }
    })
    .catch((e) => {
        return {
            statusCode: 500,
            headers: allowAccesOrigin,
            body: e
        }
    })
}

export const bulkCreateUsers = async (event) => {
    const json = JSON.parse(event.body)

    return await chatkit.createUsers(json)
        .then((users) => {
            const userIds = users.map(user => user.id)
            return chatkit.addUsersToGeneralRoom(userIds)
        })
        .then(() => {
            return {
                statusCode: 200,
                headers: allowAccesOrigin,
                body: "success"
            }
        })
        .catch((e) => {
            return {
                statusCode: 500,
                headers: allowAccesOrigin,
                body: e
            }
        })
}

export const loadInitialData = async (event) => {
    const json = JSON.parse(event.body)

    try {
        const user = await chatkit.getUser(json.userId)

        if (!user || user.name !== json.userName) {
            return {
                statusCode: 200,
                headers: allowAccesOrigin,
                body: JSON.stringify({
                    user: {}
                })
            }
        }

        const userRooms = await chatkit.getUserRooms(json.userId)
		const userCursors = await chatkit.getReadCursorsForUser(json.userId)

        const data = {
            user,
            userRooms,
            userCursors
        }

        return {
            statusCode: 200,
            headers: allowAccesOrigin,
            body: JSON.stringify(data)
        }

    } catch (error) {
        return {
            statusCode: 500,
            headers: allowAccesOrigin,
            body: error,
        }
    }

}
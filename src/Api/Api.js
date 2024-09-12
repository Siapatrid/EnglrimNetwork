import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'api-key': 'e1543644-e255-4617-91f4-8e23f811e348',
    },
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data)
    },
    followUser(id) {
        return instance.post(`follow/${id}`).then((response) => response.data)
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`).then((response) => response.data)
    },
    getProfile(id) {
        // console.warn('Obsolete method. Use profileAPI object')
        return instance.get(`profile/${id}`)
        // .then((response) => response.data)
    },
}

export const profileAPI = {
    // getProfile(userId) {
    //     return instance.get(`profile/${userId}`)
    //     // .then((response) => response.data)
    // },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
        // .then((response) => response.data)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status })
    },
    savePhoto(photoFile) {
        const formData = new FormData()

        formData.append('image', photoFile)

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    },
}

export const authAPI = {
    authUser() {
        return instance.get(`auth/me`).then((response) => response.data)
    },
    loginMe(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha,
        })
        // .then((response) => console.log(response.data))
        // .catch((error) => {
        //     console.error(error)
        // })
    },
    logoutMe() {
        return instance.delete(`auth/login`)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    },
}

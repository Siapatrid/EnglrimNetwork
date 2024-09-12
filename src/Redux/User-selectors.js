import { createSelector } from '@reduxjs/toolkit'

const getUsers = (state) => {
    return state.usersPage.usersData
}
// export const getIsFetching = (state) => {
//     debugger
//     return state.usersPage.isFetching
// }

export const getUsersSuper = createSelector(getUsers, (usersData) => {
    return usersData.filter((u) => true)
})

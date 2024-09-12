const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogsData: [
        { id: 1, name: 'Lily' },
        { id: 2, name: 'Artem' },
        { id: 3, name: 'Alex' },
        { id: 4, name: 'Queen' },
    ],
    messagesData: [
        {
            id: 1,
            message: 'Hello, Hero! We need your help!',
            stile: 'answerContainer',
            ava: 'https://img.freepik.com/premium-vector/little-kid-avatar-profile_18591-50928.jpg?w=1060',
        },
        {
            id: 2,
            message: 'How can I help You, my Queen?!',
            stile: 'userContainer',
            ava: 'https://w7.pngwing.com/pngs/862/646/png-transparent-beard-hipster-male-man-avatars-xmas-giveaway-icon-thumbnail.png',
        },
        {
            id: 3,
            message: 'The King is lost and the kingdom is in great danger!',
            stile: 'answerContainer',
            ava: 'https://img.freepik.com/premium-vector/little-kid-avatar-profile_18591-50928.jpg?w=1060',
        },
        {
            id: 4,
            message: 'It is my duty! What should I do fist?',
            stile: 'userContainer',
            ava: 'https://w7.pngwing.com/pngs/862/646/png-transparent-beard-hipster-male-man-avatars-xmas-giveaway-icon-thumbnail.png',
        },
    ],
}
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                id: 5,
                message: action.message,
                stile: 'userContainer',
                ava: 'https://w7.pngwing.com/pngs/862/646/png-transparent-beard-hipster-male-man-avatars-xmas-giveaway-icon-thumbnail.png',
            }
            return {
                ...state,
                newMessageText: '',
                messagesData: [...state.messagesData, newMessage],
            }
        }
        default:
            return state
    }
}
export const sendMesActionCreator = (newMessageText) => ({
    type: SEND_MESSAGE,
    message: newMessageText,
})
export default dialogsReducer

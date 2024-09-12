import profileReducer from './Profile-reducer'
import dialogsReducer from './Dialogs-reducer'

let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: 1, message: 'Hi, how is your english?', counter: 10 },
                { id: 2, message: 'Good luck, Buddy!', counter: 10 },
            ],
            newPostText: 'Write new post here',
        },
        messagesPage: {
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
                    message:
                        'The King is lost and the kingdom is in great danger!',
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
            newMessageText: 'Write new message here',
        },
        friends: [
            { id: 1, name: 'Lily' },
            { id: 2, name: 'Artem' },
            { id: 3, name: 'Alex' },
            { id: 4, name: 'Queen' },
        ],
    },
    _callSubscriber() {
        console.log('State was changed')
    },
    getState() {
        debugger
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(
            this._state.profilePage,
            action
        )
        this._state.messagesPage = dialogsReducer(
            this._state.messagesPage,
            action
        )
        this._callSubscriber(this._state)
    },
}

window.store = store
export default store
//store - OOP

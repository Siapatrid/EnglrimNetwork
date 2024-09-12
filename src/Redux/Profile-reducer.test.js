import profileReducer, { addPostActionCreator } from './Profile-reducer'
import React from 'react'

it('length of postsData should be incremented', () => {
    // 1. Test data
    let action = addPostActionCreator('Viktor is the best')
    let state = {
        postsData: [
            { id: 1, message: 'Hi, how is your english?', counter: 10 },
            { id: 2, message: 'Good luck, Buddy!', counter: 10 },
        ],
    }
    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.postsData.length).toBe(3)
})

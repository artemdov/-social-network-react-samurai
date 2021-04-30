import profileReducer, {actions} from "./profileReducer";
import React from 'react';

let state = {

    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 10},
        {id: 2, message: 'Hello!', likesCount: 20},
        {id: 3, message: 'Hey!', likesCount: 20}
    ],
    newPostText: '',
    profile: null,
    status: ''
}

it('posts should be correct', () => {

    let action = actions.addPost('Good action')


    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
    expect(newState.posts[0].id).toBe(1)
    expect(newState.posts[1].likesCount).toBe(20)
    expect(newState.posts[3].message).toBe('Good action')
})
it('after deleting length of messages should be decrement', () => {

    let action = actions.deletePost(1)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)

})

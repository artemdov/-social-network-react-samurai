const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {

    posts: [
        {id: 1, message: 'Hi,how are you?', likesCount: 10},
        {id: 2, message: 'Hello!', likesCount: 20},
        {id: 3, message: 'Hey!', likesCount: 20}
    ],
        newPostText: ''
}
export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action:any): InitialStateType => {

    switch (action.type) {
        case 'ADD-POST':
            let newPost = {
                id: new Date().getTime(),
                message: action.postText,
                likesCount: 0
            }
            state.posts.push(newPost)
            break;
        case 'UPDATE-NEW-POST-TEXT':
            state.newPostText = action.newText
            break;
    }

    return state
}

type addPostACType = {
    type: typeof ADD_POST
    postText: string
}
export const addPostAC = (postText: string): addPostACType => {
    return {
        type: 'ADD-POST',
        postText: postText
    } as const
}
type updateNewPostTextACType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
export const updateNewPostTextAC = (newText: string):updateNewPostTextACType => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    } as const
}






export default profileReducer
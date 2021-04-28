import React, {ChangeEvent} from "react";
import s from './Myposts.module.css';
import Post from "./Post/Post";
import {PostsType} from "../../../redux/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilits/validators/validators";
import {TextArea} from "../../universal/Forms/FormsControls";


type MyPostPropsType = {
    posts: Array<PostsType>
    addPost: (text: string) => void
}
const maxLength10 = maxLengthCreator(10)


const MyPosts = React.memo((props: MyPostPropsType) => {
    let post = props.posts
    let postsElements = post.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} id={p.id}/>)


    let onAddPost = (text: any) => {
        props.addPost(text.newPostText)
    }

    return <div className={s.content}>
        <div className={s.postBlock}>
            <h3>My posts</h3>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
        <AddPostTextProfileRedux onSubmit={onAddPost}/>

    </div>

})

const AddPostTextProfile: React.FC<InjectedFormProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} name={'newPostText'} placeholder={'Enter your text'}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const AddPostTextProfileRedux = reduxForm({form: 'profileAddTextForm'})(AddPostTextProfile)


export default MyPosts;
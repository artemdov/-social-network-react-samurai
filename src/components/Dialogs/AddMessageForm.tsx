import {Field, reduxForm} from "redux-form";
import React from "react";
import {TextArea} from "../universal/Forms/FormsControls";
import {maxLengthCreator, required} from "../../utilits/validators/validators";

const maxLength50 = maxLengthCreator(50)
const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea} validate={[required,maxLength50]} name={'newMessageBody'} placeholder={'Enter Message'} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
export const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)


import React from 'react'
import style from './FormsControls.modul.css'
import { required } from '../../Utilits/Validators/Validators'
import { Field } from 'redux-form'

const FormControl = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div
            className={style.formControl + ' ' + (hasError ? style.error : '')}
        >
            <div>{props.children}</div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps} />
        </FormControl>
    )
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
}

export const createField = (
    placeholder,
    name,
    validators,
    component,
    props = {},
    text = ''
) => (
    <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        />{' '}
        {text}
    </div>
)

import React from 'react'
import stile from './../Dialogs.module.css'
const Message = (props) => {
    return (
        <div className={stile[props.stile]}>
            <img src={props.ava} className={stile.ava} alt={'ava'} />
            {props.message}
        </div>
    )
}

export default Message

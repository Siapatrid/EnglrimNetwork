import React, { useEffect, useState } from 'react'
import stile from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {
    // let stateWithSetState = useState(false)
    // let editMode = stateWithSetState[0]
    // let setEditMode = stateWithSetState[1]

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            {!editMode && (
                <div>
                    <span onDoubleClick={activateEditMode}>
                        {props.status || 'No status =)'}
                    </span>
                </div>
            )}
            {editMode && (
                <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                    />
                </div>
            )}
        </>
    )
}

export default ProfileStatusWithHooks

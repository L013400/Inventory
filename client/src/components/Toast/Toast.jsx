import React, { useContext } from 'react'
import {MainContext} from '../../App';
import { TOAST } from '../../constants/toast';
import "./Toast.css"

export default function Toast() {
    const { state:{alerts} } = useContext(MainContext)
    if(!alerts.length)
    return null;

    const icons = {
        [TOAST.ERROR] :'uil-times-circle',
        [TOAST.SUCCESS]:'uil-check-circle',
        [TOAST.WARNING]:'uil-exclamation-circle'
    }
    return (
        <>
            {alerts && alerts.map(({type, message, id}, index) => {
                return <div key={id} className={`toast ${type}`} style={{top: 50*(index)+90 + 'px'}}>
                    <i className={"uil "+ icons[type] }></i>
                    {message}</div>
            })}
        </>
    )
}

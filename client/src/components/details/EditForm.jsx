import React, { useEffect, useState, useContext } from 'react'
import { MainContext } from '../../App'
import { updateData } from '../../context/actions'
import "./EditForm.css"
export default function EditForm({ details }) {
    const [editDetails, setEditDetails] = useState(details)
    const [isChanged, setIsChanged] = useState([])
    const {state:{data:{type}}, dispatch} = useContext(MainContext)
    useEffect(() => {
        setEditDetails(details)
        setIsChanged([])
    }, [details])

    const handleChange = (e) => {
        setEditDetails({
            ...editDetails,
            [e.target.name]: e.target.value
        })
        if(details[e.target.name] != e.target.value && e.target.value!==''){
           !isChanged.includes(e.target.name) && setIsChanged([...isChanged, e.target.name])
        }else {
            setIsChanged(isChanged.filter((item)=>item!==e.target.name))
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let obj = {}
        isChanged.forEach((key)=>{
            obj[key] = editDetails[key]
        })

        updateData(dispatch)(type,obj, editDetails.ID)
        setIsChanged([])
    }

    return (
        <form className='edit-form' onSubmit={(e) => handleSubmit(e)} >
            {Object.keys(editDetails).map((key, index) => {
                if(key==='ID') return;
                return <div className="field" key={key}>
                    <label>{key}<span>*</span></label>
                    <input
                        name={key}
                        autoFocus={index === 0 && true}
                        type='text'
                        value={editDetails[key]}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
            })}
            <button
                type="submit"
                className='btn save-edit'
                disabled={!isChanged.length}
            >
                Save Changes
            </button>
        </form>
    )
}

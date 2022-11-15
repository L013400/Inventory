import React, { useState, useContext, useEffect } from 'react'
import { MainContext } from '../../App'
import EditForm from "./EditForm"
import "./Table.css"

export default function Table({ searchedData }) {
    const [selected, setSelected] = useState(searchedData[0] || null)
    const { state: { user: { isAuthenticated }, data:{type} } } = useContext(MainContext)
    const [showEdit, setShowEdit] = useState(false)
    useEffect(() => {
        !isAuthenticated && setShowEdit(false)
    }, [isAuthenticated])
    function isSelected(item) {
        return selected && item.ID === selected.ID ? true : false
    }

    function getType(invType){
    
        const mapping = {
            'ON-PREM':'DOMAIN_NAME',
            'MDM':'HOSTNAME',
            'IICS':'ORGANIZATION_NAME'
        }

        return mapping[invType]
    
    }
    useEffect(() => {
        if (selected && searchedData.length) {
            console.log({selected, searchedData})
            let item = searchedData.filter((item) => item.ID === selected.ID)[0]
            setSelected(item)
        }
    }, [searchedData, selected])

    const handleEditForm = () => {
        if (!isAuthenticated)
            return;
        setShowEdit(!showEdit)
    }

    return (
        <>
            <div className="table-container">
                <div className="domain-list">
                    {searchedData.map((item) =>
                        <div key={item.ID}
                            className={`domain-list-item ${isSelected(item) ? 'active' : ''}`}
                            onClick={() => setSelected(item)}>
                            {item[getType(type)]}
                        </div>)}
                </div>
                <div className="domain-info">
                    {selected && <>
                        <div className="table-head">
                            <p>Domain Details</p>
                            {isAuthenticated && <i className="uil uil-edit" onClick={handleEditForm}></i>}
                        </div>
                        {showEdit && isAuthenticated ? <EditForm details={selected} /> :
                            Object.keys(selected).map((key) => key==='ID'? null : <p key={key}><b>{key}</b> : {selected[key]}</p>)
                        }
                    </>}
                </div>
            </div>
        </>
    )
}

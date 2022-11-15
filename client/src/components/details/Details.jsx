import React, { useContext} from 'react'
import "./Details.css"
import {MainContext} from '../../App';

import Table from './Table';


function Details(props) {
    const {state } = useContext(MainContext);
    const searchedData = state.data.searchedData || [], isAuthenticated=state.user.isAuthenticated || false

    function ImageWithText({ image, text }) {
        return <div className="image-container">
            <img src={image} alt="presentational-svg" />
            <h1 className='image-text'> {text}</h1>
        </div>
    }
    return (
        <div className="details-container">
            {!searchedData?.length ? <ImageWithText
                image={`assets/${isAuthenticated ? 'search' : 'locked'}.svg`}
                text={`Try searching to get some results`} />:
            <Table searchedData={searchedData}/>
            }
        </div>
    )
}

Details.layout='default'
export default Details;
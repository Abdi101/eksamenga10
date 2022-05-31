import StarRating from "../starrating/StarRating";
import { useState } from 'react';

const SingleRating = (props) => {
    const [edit, setEdit] = useState(false);
    const [rating, setRating] = useState("");
    const handleEditCancel = () => {
        {setEdit(!edit)}
    }

    const handleSave = () => {
        console.log(rating);
        if(edit){setEdit(!edit)}
        props.onClick(rating, props.data);
    }
    return (
        <div className="ratingWrapper">
            <div style={{
                marginRight: "10px"
            }}>28/02/2022</div>
            <div className="ratingInfo">
                    <span><b>Coffee: </b>Evergood Classic</span>
                    <span><b>Grinding Setting: </b>{props.data.brewId.grindingSettings}</span>
                    <span><b>Water: </b>1.5l</span>
                    {!edit && <StarRating {...props.data}/>}
                    {edit && <input 
                                type="number"
                                min="1" max="5"
                                id="newRating"
                                name="newRating"
                                placeholder={props.data.rating} 
                                value={setRating.newRating}
                                onChange={(e) => { setRating({ newRating: e.target.value }) }}
                                />}
            </div>
            <button className={ `ratingButton ${edit && 'secondaryButton'}` } onClick={handleEditCancel}>{edit&&"Cancel"}{!edit&&"Edit"}</button>
            {edit&&<button className="ratingButton" onClick={handleSave}>Save</button>}
        </div >
    )
}

SingleRating.defaultProps = {
    onClick: () => {}
}

export default SingleRating;
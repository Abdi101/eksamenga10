import React,{useState} from 'react';

function RateBrew({brew, update}){

    const [edit,setEdit] = useState(false);
    const [rating,setRating] = useState(null);

    const updateBrew = () => {
        const payload = {brewID: brew._id, rating: rating};
        update(payload);
        setEdit(false);
    }

    return(
        <div className="rate-brew-container">
            {
                edit ? (
                    <div>
                        <input type='number' min={1} max={5} placeholder="1-5" onChange={(e)=>setRating(+e.target.value)}/>
                        {rating && <button onClick={updateBrew}>Save &rarr;</button>}
                    </div>
                ): <button onClick={()=>setEdit(true)}>Rate &rarr;</button>
            }

        </div>
    )
}

export default RateBrew;
import React from "react";
import {
    useParams
} from "react-router-dom";

function City() {
    const params: {id: string} = useParams()
    const id = params.id
    return (
        <div>
            <h1>{id}</h1>
        </div>
    );
}

export default City

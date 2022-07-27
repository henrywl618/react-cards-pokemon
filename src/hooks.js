import React, {useEffect, useState} from "react";
import axios from "axios";

const useFlip = ()=>{
    const [flipped, setFlipped] = useState(true);

    const toggleFlipped = ()=>{
        flipped ? setFlipped(false) : setFlipped(true);
    };

    return [flipped, toggleFlipped]
};

const useAxios =(url, method='get')=>{
    const[response, setResponse] = useState(null);
    const[currentURL, setUrl] = useState(url);

    const getData = async ()=>{
        try {
            const res = await axios({
                url:currentURL,
                method,
            });
            setResponse(()=>res);
        } catch (error){
            console.log(error);
        }
    };

    //Will get API data if the URL is updated. Used for Pokedex.
    useEffect(()=>{
        if(currentURL){
            getData();
        };
    },[currentURL]);


    return [response, getData, setUrl]
};

export {useFlip, useAxios};
import React, {useEffect} from 'react';
import axios from 'axios';

function Example(){
    useEffect(()=> {
        axios.get('/api/hello')
        .then(response => console.log('data :' +response.data));
    }, [])

    return (
        <div>
            Example 페이지
        </div>
    )
};

export default Example;
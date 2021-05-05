/*
 * STATE SAVE data in objects/classes
 * Using Hooks STATE and EFFECT
 * every time any action will dispatch the effect
 * */

import {useState, useEffect} from 'react';


function useFetch(api) {

    // STATE Initiation of data, Update STATE of data array
    const [data, setData] = useState([]);
    
    // STATE Initiation of loading, Update STATE of loading bool
    const [loading, setLoading] = useState(false);
    
    // STATE Initiation of error, Update STATE of error
    const [error, setError] = useState();
    
    // EFFECT 
    useEffect(() => {
        async function fetchData() {
            // SAVE loading STATE true
            setLoading(true);
            
            // SAVE error STATE null
            setError();
            
            
            // fetch api
            fetch(api)
                .then(response => response.json())
                .then(result => {
                    // Save to data STATE
                    setData(result['results'])
                })
                .catch(err => {
                    // log error
                    console.log('error');
                    // SAVE to error STATE
                    setError('error');
                });
                
            // SAVE
            setLoading(false);
        }
        fetchData();
        
    // every action change api will effect to patch Data
    }, [api,]);
    return [data, loading, error];
    
    
}

export default useFetch;
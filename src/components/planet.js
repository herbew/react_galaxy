/*
 * STATE SAVE data in objects/classes PLANET
 * Using Hooks STATE and EFFECT
 * every time any action will dispatch the effect
 * */

import React, {useState, useEffect} from 'react';
import useFetch from "./fetch";

function PlanetList() {
	
	// STATE planet
    const [ planets, setPlanets ] = useState([]);
    
    // FETCH Planet data
	const [ dataFetch, loadingFetch, errorFetch ] = useFetch('https://swapi.dev/api/planets/');
    
    
    // Every time any action from dataFetch will dispatch to save to planet STATE 
    useEffect(()=>{
        
    	setPlanets(dataFetch.filter(
    		item => item['films'].length >= 2 && (item['residents'].length > 0 && 
    		    item['residents'].filter(
    		        poeple => (
    		            fetch(poeple)
    		            .then(response => response.json())
                        .then(r=> {
                            
                            if (r['species'].length > 0){
                                return r['species'].filter(
                                    species => (
                                        fetch(species)
                                        .then(response => response.json())
                                        .then(result => {
                                            if (result['classification'] === 'reptile'){
                                                console.log(result['classification']);
                                                return result;
                                            }else{
                                                return [];
                                            }
                                            
                                        })
                                        .catch(e => {
                                            return []; 
                                        })
                                    )
                                )
                                
                            }else{
                                return [];
                            }
                        })
                        .catch(e => {
                            return []; 
                    })
    		        ).length > 0
    		    )
    		) 
    	))
    	
    	
      },[dataFetch])
	
	if(loadingFetch) return <h1>Loading...</h1>
    if(errorFetch) return <h1>Error loading PLANET { errorFetch }</h1>
    
	return (
		<div>
		{ 
			planets.length > 0 && (planets.map((item,index) => {
		    		return(
		    				<div key={item.url}>
		    					<>{ index + 1 }.</>
		    					<>{ item.name }</>
		    					<>{ item.url }</>
		    				</div>
		    				
		    		)
		    	}
		    
		    ))
		}
		</div>
	);
	
}
	
export default PlanetList;
	
	
/*	
	
	
	
	state = {
			isFetching: false,
	        planets: []
	    }
	
	fetchPlanetsWithFetchAPI = () => {
        this.setState({...this.state, isFetching: true});
        fetch('https://swapi.dev/api/planets/')
            .then(response => response.json())
            .then(result => {
                this.setState({planets: result['results'], isFetching: false})
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false});
            });
    };
    fetchPlanets = this.fetchPlanetsWithFetchAPI
	
	
    componentDidMount() {
        this.fetchPlanets();
        //this.timer = setInterval(() => this.fetchPlanets(), 5000);
    }
	
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    
    useEffect() {
	      console.log('Hello World');
	  }
    
    onUpdateItem = (i, action) => {
    	var new_diameter = 0;
    	this.setState(state => {
	      const planets = state.planets.map((item, index) => {
	        if (index === i) {
	        	if (action === 'INC'){
	        		new_diameter = parseInt(item['diameter'], 10) + 1;
	        		item['diameter']  = new_diameter;
	        	}else if(action === 'DEC'){
	        		new_diameter = parseInt(item['diameter'], 10) - 1;
	        		item['diameter']  = new_diameter;
	        	}else{
	        		this.fetchPlanets();
	        	}
	        	
	        }
	        return item;
	      });
	 
	      return {
	        planets,
	      };
	    });
	  };
    
	
	  
    render() {
        return (
        	 <div>
                 {this.state.planets.length > 0 && (
            		<table>
	        		 	<tr> 
	        		 		<td>URL</td>
	        		 		<td>Name</td>
	        		 		<td>Diameter</td>
	        		 	</tr>
	                    
	        		 	{this.state.planets.map((planet, index) => (
        		 			<tr> 
		        		 		<td>{ planet.url }</td>
		        		 		<td>{ planet.name }</td>
		        		 		<td>{ planet.diameter }</td>
		        		 		<td><button 
		        		 			id="btn-{ index }"
		        		 			type="button"
		        	                onClick={ () => this.onUpdateItem(index, 'INC') } 
		        		 			>DIAMETER INCREMENT </button></td>
		        		 	</tr>
	                     ))}
                     
                     </table>
                 )}
                 
             </div>
        )
    }
}


export default Planet;

*/

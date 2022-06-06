import { useEffect, useState } from "react"

//export function named Locations
export const Locations = () => {
    //deconstruct the values in new variables: locations - value of empty array, setLocations - value of function
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
            .then(response => response.json())
            .then((locationsArray) => { 
                setLocations(locationsArray) //passes what you want the new value to be
            })
        },
        []
    )
    
    return <>
        <h2>Locations</h2>
            <ul>
                {
                    locations.map
                    ((location) => {
                        return <li className="address" key={location.id}>
                            {location.address} - the square feet is {location.squareFootage}
                        </li>
                        }
                    )
                }
            </ul>
            
        </>
}

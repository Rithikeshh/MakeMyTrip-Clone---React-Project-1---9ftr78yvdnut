import React, { useEffect } from 'react'
import { useNavbarToggleContext } from '../App'

function FlightSearch() {
    const{setNavbar} = useNavbarToggleContext()
    useEffect(()=>{

        return ()=>{
            setNavbar(true)
        }
    },[])
  return (
    <div>
      Flight
    </div>
  )
}

export default FlightSearch

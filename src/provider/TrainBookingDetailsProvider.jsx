import React, { createContext } from 'react'

const TrainBookingDetailsContext = createContext();
function TrainBookingDetailsProvider({children}) {
  return (
    <TrainBookingDetailsContext.Provider value={{}}>
        {children}
    </TrainBookingDetailsContext.Provider>
  )
}

export default TrainBookingDetailsProvider

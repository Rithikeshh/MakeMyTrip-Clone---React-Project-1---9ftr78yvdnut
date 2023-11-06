import { getDay, getMonth } from "../utils/dateFunctions";

export const flightBookingDetails = {
    fromCity: "New Delhi",
    toCity: "Kolkata",
    travelDate: {
        date: new Date().getDate(),
        month: getMonth(new Date().getMonth()),
        year: new Date().getFullYear()%100,
        day: getDay(new Date().getDay())
    },
    ticketClass:{
        head: 'All',
        text: 'All Class'
    } 
}
export default function flightReducer(state, action){
    switch(action.type){

        default :
        return {
            ...state,
        }
    }
}
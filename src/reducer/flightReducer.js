import { getDay, getMonth } from "../utils/dateFunctions";

export const flightBookingDetails = {
    fromCity: "Mumbai",
    toCity: "Kolkata",
    travelDate: {
        date: new Date().getDate(),
        month: getMonth(new Date().getMonth()),
        year: new Date().getFullYear(),
        day: getDay(new Date().getDay())
    },
    ticketClass:{
        head: 'All',
        text: 'All Class'
    },
    travellers: 2
}
export default function flightReducer(state, action){
    switch(action.type){

        case 'flightFromCity':
            return{
                ...state,
                fromCity: action.payload
            }
        case 'flightToCity':
            return {
                ...state,
                toCity: action.payload
            }
        case 'flightTravelDate' :
            return{
                ...state,
                travelDate: {
                    ...state.travelDate,
                    date: action.payload.date,
                    month: getMonth(action.payload.month),
                    year: action.payload.year,
                    day: getDay(action.payload.day)
                }
            }
        case 'swap' :
            return {
                ...state,
                fromCity: state.toCity,
                toCity: state.fromCity
            }
        default :
        return {
            ...state,
        }
    }
}
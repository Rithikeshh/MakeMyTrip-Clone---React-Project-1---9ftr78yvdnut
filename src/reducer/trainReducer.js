import { getDay, getMonth } from "../utils/dateFunctions";

export const trainBookingDetails = {
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

export default function trainReducer(state, action){
    switch(action.type){

        case 'trainFromCity':
            return{
                ...state,
                fromCity: action.payload
            }
        case 'trainToCity':
            return {
                ...state,
                toCity: action.payload
            }
        case 'trainTravelDate' :
            return{
                ...state,
                travelDate: {
                    ...state.travelDate,
                    date: action.payload.date,
                    month: getMonth(action.payload.month),
                    year: action.payload.year%100,
                    day: getDay(action.payload.day)
                }
            }
        case 'swap' :
            return {
                ...state,
                fromCity: state.toCity,
                toCity: state.fromCity
            }
        default:
            return {...state};
    }
}
import { getDay, getMonth } from "../utils/dateFunctions";

const day = new Date();
const nextDay = new Date(day)
nextDay.setDate(day.getDate()+1)
export const hotalBookingDetails={
    city: 'Mumbai',
    checkIn: {
        date: new Date().getDate(),
        month: getMonth(new Date().getMonth()),
        year: new Date().getFullYear(),
        day: getDay(new Date().getDay())
    },
    checkOut: {
        date: nextDay.getDate(),
        month: getMonth(nextDay.getMonth()),
        year: nextDay.getFullYear(),
        day: getDay(nextDay.getDay())
    },
    room : 1,
    adults: 2,
    childrens: null
}
export default function hotelReducer(state, action){
    switch(action.type){

        case 'hotelLocation':
            return {
                ...state,
                city: action.payload
            }
        case 'hotleCheckIn' :
            return{
                ...state,
                checkIn:{
                    ...state.checkIn,
                    date: action.payload.date,
                    month: getMonth(action.payload.month),
                    year: action.payload.year,
                    day: getDay(action.payload.day)
                },    
            }
        case 'hotleCheckOut' :
            return{
                ...state,
                checkOut:{
                    ...state.checkOut,
                    date: action.payload.date,
                    month: getMonth(action.payload.month),
                    year: action.payload.year,
                    day: getDay(action.payload.day)
                },    
            }
        default:
            return {...state};
    }
}
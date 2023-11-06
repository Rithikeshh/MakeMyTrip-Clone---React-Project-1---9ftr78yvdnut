import { getDay, getMonth } from "../utils/dateFunctions";

export const hotalBookingDetails={
    city: 'Goa',
    checkIn: {
        date: new Date().getDate(),
        month: getMonth(new Date().getMonth()),
        year: new Date().getFullYear()%100,
        day: getDay(new Date().getDay())
    },
    checkOut: {
        date: 10,
        month: "Nov",
        year: 23,
        day: 'Friday'
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
                    year: action.payload.year%100,
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
                    year: action.payload.year%100,
                    day: getDay(action.payload.day)
                },    
            }
        default:
            return {...state};
    }
}
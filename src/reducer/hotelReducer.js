export const hotalBookingDetails={
    city: 'Goa',
    checkIn: {
        date: 1,
        month: "Nov",
        year: 23,
        day: 'Sunday'
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
        default:
            return {...state};
    }
}
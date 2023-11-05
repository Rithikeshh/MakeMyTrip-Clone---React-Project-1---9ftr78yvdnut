export const trainBookingDetails = {
   fromCity: "New Delhi",
   toCity: "Kolkata",
   travel: {
        date: 7,
        month: "Nov",
        year: 23,
        day: 'Monday'
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
        default:
            return {...state};
    }
}
import axios from "axios";

export default async function getFlightList(source, destination, day, setFlightList){

    const config = {
        headers : {
            "Content-Type": "application/json",
            projectID: "f104bi07c490"
        }
    }
    console.log('source', source);
    console.log('destination', destination);
    const result = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight?day=${day}&search={"source":"${source}","destination":"${destination}"}`,
        config
    )
    console.log(result.data.data.flights);
    setFlightList(result.data.data.flights);
}
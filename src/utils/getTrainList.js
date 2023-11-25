import axios from "axios";

export default async function getTrainList(source, destination, day, setTrainList, setLoading){

    const config = {
        headers : {
            "Content-Type": "application/json",
            projectID: "f104bi07c490"
        }
    }
    console.log('source', source);
    console.log('destination', destination);
    console.log('day', day);
    try{
        const result = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${""}","destination":"${""}"}&day=${day}`,
            config
        )
        console.log(result.data.data.trains);
        setTrainList(result.data.data.trains);
    } catch(e){
        console.log(e);
    }
    setTimeout(()=>{
        setLoading(false)
    },1000)
}
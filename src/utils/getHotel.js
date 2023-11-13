export default async function getHotel(id, setHotel, setName, setLoading){

    const config = {
      Method : "GET",
      headers : {
        "Content-Type": "application/json",
        projectID: "f104bi07c490"
      }
    }
    
    try{
      let response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${id}`,
        config
      )
      let result = await response.json();
      console.log(result);
      setName(result.data.name)
      setHotel(result.data)
    }
    catch(error){
      console.log('error', error)
    }
    setLoading(false)
  }
export function bookFlightTicket(flightId){
    const token = localStorage.getItem("userToken");
    const user = JSON.parse(localStorage.getItem("userDetails"))
    const userId = user.id;
    const config = {
      method: "POST",
      body : JSON.stringify({
        "bookingType" : "flight",
        "userId" : userId,
        "bookingDetails" : {
          "flightId":flightId,
          "startDate":"2023-10-09T10:03:53",
          "endDate" : "2023-10-09T10:05:53"
        }
      }),
      headers: {
        "Content-Type": "application/json",
        "projectID": "f104bi07c490",
        "Authorization": `Bearer ${token}`
      }
    }
    fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking',config).then((res)=>{
      return res.json();
    }).then((result)=>{
      console.log(result)
    }).catch((e)=>{
      console.log(e);
    })
  }
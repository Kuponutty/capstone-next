"use server";
import AddUser from "./AddUser";
export default async function AddUserServerside() {
    const handleSubmit = async(wid, email) =>  {
        "use server";   
    const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "wid": wid,
        "email": email,
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      fetch("https://prod-90.westus.logic.azure.com:443/workflows/41d5e5cd3c9544fca884b1ac07e6d484/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6rXezEId0KVqKOId-EVlLAcQgDCr0J2nctnXRSaXL3s", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }

    return (
        <>
        <AddUser submit={handleSubmit}/>
        </>
    )
}
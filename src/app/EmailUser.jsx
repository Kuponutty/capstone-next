"use client";

export default function EmailUser() {
    return (
<div id="emailUser">
    <input type="text" id="emailUserWid" name="emailUserWid"></input>
    <input type="text" id="emailUserEmail" name="emailUserEmail"></input>
    <button onClick = {() => {

        const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const wid = document.getElementById("emailUserWid");
      const email = document.getElementById("emailUserEmail");

const raw = JSON.stringify({
  "startDate": "2024-11-18",
  "wid": wid.value,
        "email": email.value
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://prod-164.westus.logic.azure.com:443/workflows/2dafbac1372546f49258316abccf3700/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RJ5snJ-eCD2tT48DZzvkgPiarwMIBiOBEc1bM9-xAss", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
      }}
  >Send</button>
    </div>
    )
}

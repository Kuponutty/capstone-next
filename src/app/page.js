import Image from "next/image";
import GetTimesheet from './GetTimesheet'
// import AddUser from "./AddUser";
// import EmailUser from "./EmailUser";
import AddUserServerside from "./AddUserServerside";
import AddNewUser from "./AddNewUser";

export default function Home() {
  return (
    <>
    

    <div id="getTimesheets">
      <GetTimesheet/>
      <AddNewUser/>
    </div>
    {/* <AddUserServerside/> */}
    {/* <EmailUser/> */}
    
    </>
  )
  
}

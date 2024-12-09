import Image from "next/image";
import GetTimesheet from './GetTimesheet'
// import AddUser from "./AddUser";
// import EmailUser from "./EmailUser";
import AddUserServerside from "./AddUserServerside";

export default function Home() {
  return (
    <>
    

    <div id="getTimesheets">
      <GetTimesheet/>
    </div>
    {/* <AddUserServerside/> */}
    {/* <EmailUser/> */}
    
    </>
  )
  
}

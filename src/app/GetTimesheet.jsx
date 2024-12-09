"use client";

import React, { useEffect, useState } from "react";

function GetTimesheet() {
  const [timesheets, setTimesheets] = useState([]);
  const [missingUsers, setMissingUsers] = useState([]); // Add missingUsers state
  const [error, setError] = useState(null);
  const [loadingTimesheets, setLoadingTimesheets] = useState(true);
  const [loadingMissingUsers, setLoadingMissingUsers] = useState(true);
  
  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await fetch("/api/timesheets");
        if (!response.ok) throw new Error("Failed to fetch timesheets");
        const data = await response.json();
        setTimesheets(data.timesheets);
        setMissingUsers(data.missingUsers); // Set missingUsers here
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoadingTimesheets(false);
        setLoadingMissingUsers(false);
      }
    };
    fetchTimesheets();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loadingTimesheets || loadingMissingUsers) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Timesheet Dashboard</h1>
      <div>
        <h2>Submitted Timesheets</h2>
        <table>
          <thead>
            <tr>
              <th>User W#</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Hours</th>
              <th>Leave Type</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((sheet, index) => (
              <tr key={index}>
                <td>{sheet.user_wid ?? "null"}</td>
                <td>{sheet.start_date ?? "null"}</td>
                <td>{sheet.end_date ?? "null"}</td>
                <td>{sheet.hours ?? "null"}</td>
                <td>{sheet.leave_type ?? "null"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Users Who Didn’t Submit Timesheets</h2>
        <table>
          <thead>
            <tr>
              <th>WID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {missingUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.wid}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetTimesheet;


// "use client";

// import React, { useEffect, useState } from "react";

// function GetTimesheet() {
//   const [timesheets, setTimesheets] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTimesheets = async () => {
//       try {
//         const response = await fetch("/api/timesheets");
//         if (!response.ok) {
//           throw new Error("Failed to fetch timesheets");
//         }
//         const data = await response.json();
//         setTimesheets(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchTimesheets();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Timesheet Dashboard</h1>
//       <div>
//         <h2>Submitted Timesheets</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>User W#</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Hours</th>
//               <th>Leave Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {timesheets.map((sheet, index) => (
//               <tr key={index}>
//                 <td>{sheet.user_wid}</td>
//                 <td>{sheet.start_date}</td>
//                 <td>{sheet.end_date}</td>
//                 <td>{sheet.hours}</td>
//                 <td>{sheet.leave_type}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div>
//         <h2>Users Who Didn’t Submit Timesheets</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>WID</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {missingUsers.map((user, index) => (
//               <tr key={index}>
//                 <td>{user.wid}</td>
//                 <td>{user.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default GetTimesheet;

// "use client";

// import React, { useEffect, useState } from "react";

// function GetTimesheet() {
//   const [timesheets, setTimesheets] = useState([]);
//   const [error, setError] = useState(null);
//   const [loadingTimesheets, setLoadingTimesheets] = useState(true);
//   const [loadingMissingUsers, setLoadingMissingUsers] = useState(true);
  
//   useEffect(() => {
//     const fetchTimesheets = async () => {
//       try {
//         const response = await fetch("/api/timesheets");
//         if (!response.ok) throw new Error("Failed to fetch timesheets");
//         const data = await response.json();
//         setTimesheets(data.timesheets);
//         setMissingUsers(data.missingUsers);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoadingTimesheets(false);
//         setLoadingMissingUsers(false);
//       }
//     };
//     fetchTimesheets();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Timesheet Dashboard</h1>
//       <div>
//         <h2>Submitted Timesheets</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>User W#</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Hours</th>
//               <th>Leave Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {timesheets.map((sheet, index) => (
//               <tr key={index}>
//                 <td>{sheet.user_wid}</td>
//                 <td>{sheet.start_date}</td>
//                 <td>{sheet.end_date}</td>
//                 <td>{sheet.hours}</td>
//                 <td>{sheet.leave_type}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div>
//         <h2>Users Who Didn’t Submit Timesheets</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>WID</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {missingUsers.map((user, index) => (
//               <tr key={index}>
//                 <td>{user.wid}</td>
//                 <td>{user.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default GetTimesheet;
// import React, { useState, useEffect } from "react";
// import axios from "axios";


// const PbsData = React.memo(() => {
//   const [pbsData, setPbsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:5000/fingerprints'); // create WebSocket connection

//     socket.onopen = () => {
//       console.log('WebSocket connected'); // log connection status
//     };

//     socket.onmessage = (event) => {
//       console.log('WebSocket data received', event.data); // log data received
//       setPbsData(JSON.parse(event.data)); // update state with new data
//       localStorage.setItem('pbsDataCache', event.data); // update cached data
//     };

//     const cachedData = localStorage.getItem('pbsDataCache');

//     if (cachedData) {
//       setPbsData(JSON.parse(cachedData)); // use cached data if it exists
//     } else {
//       axios.get(`http://localhost:5000/fingerprints`)
//         .then(response => {
//           setPbsData(response.data);
//           localStorage.setItem('pbsDataCache', JSON.stringify(response.data)); // cache fetched data
//         })
//         .catch(error => { console.log(error) })
//     }

//     return () => socket.close(); // close WebSocket on unmount
//   }, []);

//   const maleCount = pbsData.filter((report) => report.gender === "M").length;



//   return (
//     <div>
//       <div className="row">
//         <div className="col-md-12 grid-margin stretch-card">
//           <div className="card">
//             <div className="card-body">
//               <h4 className="card-title">
//                 All valid PBS:
//                 <span className="text-success">{pbsData.length}</span>
//               </h4>
//               <div>
//                 <table className="table table-hover text-light table-bordered">
//                   <thead className="thead mt-3">
//                     <tr className="bg-success text-uppercase">
//                       <th>PEPFAR ID</th>
//                       <th>Family Name</th>
//                       <th>Given</th>
//                       <th>Gender</th>
//                       <th>Date Captured</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {pbsData.map((pbs) => (
//                       <tr key={pbs.id}>
//                         <td>{pbs.identifier}</td>
//                         <td>{pbs.family_name}</td>
//                         <td>{pbs.given_name}</td>
//                         <td>{pbs.gender}</td>
//                         <td>{pbs.date_created}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default PbsData;

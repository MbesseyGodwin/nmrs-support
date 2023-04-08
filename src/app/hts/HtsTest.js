import { useState, useEffect } from 'react';

function HtsTest() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/fingerprints');
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, []);

  // Render the component using the fetched data
  return (
    <div className='bg-info'>
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.family_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HtsTest;




// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import moment from 'moment';


// const HtsHistory = () => {
//   const [htsData, setHtsData] = useState([]);
//   // months variables
//   const [January, setJanuary] = useState(5);
//   const [February, setFebruary] = useState(5);
//   const [March, setMarch] = useState(5);
//   const [April, setApril] = useState(5);
//   const [May, setMay] = useState(5);
//   const [June, setJune] = useState(5);
//   const [July, setJuly] = useState(5);
//   const [August, setAugust] = useState(5);
//   const [September, setSeptember] = useState(5);
//   const [October, setOctober] = useState(5);
//   const [November, setNovember] = useState(5);
//   const [December, setDecember] = useState(5);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/htsdata");
//         const data = await response.json();
//         setHtsData(data);
//         localStorage.setItem("htsData", JSON.stringify(data)); // Store data in localStorage



//         const januaryData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "1-2022";
//         });
//         setJanuary(januaryData.length);

//         const februaryData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "2-2022";
//         });
//         setFebruary(februaryData.length);

//         const marchData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "3-2022";
//         });
//         setMarch(marchData.length);

//         const aprilData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "4-2022";
//         });
//         setApril(aprilData.length);

//         const mayData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "5-2022";
//         });
//         setMay(mayData.length);

//         const juneData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "6-2022";
//         });
//         setJune(juneData.length);

//         const julyData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "7-2022";
//         });
//         setJuly(julyData.length);

//         const augustData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "8-2022";
//         });
//         setAugust(augustData.length);

//         const septemberData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "9-2022";
//         });
//         setSeptember(septemberData.length);

//         const octoberData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "10-2022";
//         });
//         setOctober(octoberData.length);

//         const novemberData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "11-2022";
//         });
//         setNovember(novemberData.length);

//         const decemberData = data.filter((item) => {
//           return moment(item.HIVTestDate, "DD-MM-YYYY").format("M-YYYY") === "12-2022";
//         });
//         setDecember(decemberData.length);

//       } catch (error) {
//         console.error(error);
//       }
//     };

//     const storedData = localStorage.getItem("htsData");
//     if (storedData) {
//       setHtsData(JSON.parse(storedData)); // Restore data from localStorage
//     } else {
//       fetchData();
//     }
//   }, []);

//   const nullValues = htsData.filter((item) => {
//     return item.HIVTestDate === null;
//   });

//   const notNullValues = htsData.filter((item) => {
//     return item.HIVTestDate !== null;
//   });

//   console.log("null values: " + nullValues.length);
//   console.log("not null values: " + notNullValues.length);
//   console.log("january: " + January);

//   console.log(htsData);

//   const data = {
//     labels: ["October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August", "September"],
//     datasets: [
//       {
//         label: "FY_2023",
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//         data: [October, November, December, January, February, March, April, May, June, July, August, September],
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//     barThickness: 20 // set a smaller value to make the bars thinner
//   };


//   return (
//     <div className="col-md-6 grid-margin stretch-card">
//       <div className="card">
//         <div className="card-body">
//           <h4 className="card-title small">HTS History</h4>
//           <div className="aligner-wrapper">
//             <Bar data={data} options={options} />
//           </div>
//           <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
//             <div className="text-md-center text-xl-left">
//               <h6 className="mb-1">Record Set</h6>
//               <p className="text-muted mb-0">Total tested: {htsData.length}</p>
//             </div>
//             <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
//               <h6 className="font-weight-bold mb-0 text-success">{ }</h6>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HtsHistory;

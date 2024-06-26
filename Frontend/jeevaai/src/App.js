import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useFetch from './fetch.js';
import { Buffer } from 'buffer';

// function App() {
//   const [audioSource, setAudioSource] = useState(null);
//   const { data } = useFetch("/api/submission");
//   const audioElement = useRef();
//   useEffect(() => {
//     if (data) {
//       const binaryData = data?.formData.soundFile.data.data;
//       const arrayBuffer = Buffer.from(binaryData, 'binary').buffer;
//       const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
//       const url = window.URL.createObjectURL(blob);
//       audioElement.current.src = url;
//     }
//   }, [data])

//   const [doctorName, setDoctorName] = useState("");
//   const [patientName, setpatientName] = useState("");
//   const [patientAge, setpatientAge] = useState("");
//   const [recordingDate, setrecordingDate] = useState("");
//   const [soundFile, setsoundFile] = useState(null);

//   const submitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('doctorName', doctorName);
//       formDataToSend.append('patientName', patientName);
//       formDataToSend.append('patientAge', patientAge);
//       formDataToSend.append('recordingDate', recordingDate);
//       formDataToSend.append('soundFile', soundFile);
//       await axios.post('http://localhost:8080/api/new', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log('Form data submitted successfully');
//     } catch (error) {
//       console.error('Error submitting form data:', error);
//     }

//   };

//   if (data) {
//     const binaryData = data?.formData.soundFile.data.data;
//     const arrayBuffer = Buffer.from(binaryData, 'binary').buffer;
//   }

//   return (

//     <>
//       <div>
//         <form>
//           <div className='fullscreen'>
//             <div className='Input-Header'>
//               Doctor's Name :
//               <input className='inputfield' onChange={(e) => { setDoctorName(e.target.value) }} value={doctorName} type='text' placeholder="Enter Doctor's name here"></input>
//             </div>
//             <div className='Input-Header'>
//               Patient's Name :
//               <input className='inputfield' onChange={(e) => { setpatientName(e.target.value) }} value={patientName} type='text' placeholder="Enter Patient's name here"></input>
//             </div>
//             <div className='Input-Header'>
//               Patient’s Age:
//               <input className='inputfield' onChange={(e) => { setpatientAge(e.target.value) }} value={patientAge} type='number' placeholder="Enter Patient's Age here"></input>
//             </div>
//             <div className='Input-Header'>
//               Date of the sound recording :
//               <input className='inputfield' onChange={(e) => { setrecordingDate(e.target.value) }} value={recordingDate} type='date' placeholder="Enter Doctor's name here"></input>
//             </div>
//             <div className='Input-Header'>
//               Upload a sound file :
//               <input className='inputfieldd' onChange={(e) => { setsoundFile(e.target.files[0]) }} type='file' placeholder="Enter Doctor's name here"></input>
//             </div>
//             <div className='submitButton'>
//               <button className='submitButton1' onClick={submitHandler}>Submit</button>
//             </div>
//           </div>
//         </form>
//         <div>
//           <table>
//             <thead>
//               <tr>
//                 <th>Doctor's Name</th>
//                 <th>Patient's Name</th>
//                 <th>Patient's Age</th>
//                 <th>Recording Date</th>
//                 <th>Sound File</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{data?.formData.doctorName}</td>
//                 <td>{data?.formData.patientName}</td>
//                 <td>{data?.formData.patientAge}</td>
//                 <td>{data?.formData.recordingDate}</td>
//                 <td>
//                   <audio controls ref={audioElement}>
//                   </audio>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

function App() {
  const [audioSource, setAudioSource] = useState(null);
  const [lastSubmissionCheck, setlastSubmissionCheck] = useState(false);
  const { data } = useFetch("/api/submission");
  // if (data) {
  //   setlastSubmissionCheck(data.success)
  // }
  const audioElement = useRef();
  useEffect(() => {
    setlastSubmissionCheck(data?.success)
    if (data && lastSubmissionCheck) {
      const binaryData = data?.formData.soundFile.data.data;
      const arrayBuffer = Buffer.from(binaryData, 'binary').buffer;
      const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const url = window.URL.createObjectURL(blob);
      audioElement.current.src = url;
    }
  }, [data])

  const [doctorName, setDoctorName] = useState("");
  const [patientName, setpatientName] = useState("");
  const [patientAge, setpatientAge] = useState("");
  const [recordingDate, setrecordingDate] = useState("");
  const [soundFile, setsoundFile] = useState(null);
  const [message, setMessage] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('doctorName', doctorName);
      formDataToSend.append('patientName', patientName);
      formDataToSend.append('patientAge', patientAge);
      formDataToSend.append('recordingDate', recordingDate);
      formDataToSend.append('soundFile', soundFile);
      const res = await axios.post('http://localhost:8080/api/new', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res);
      if (res.data.success) {
        setMessage(res.data.message);
        setDoctorName("");
        setpatientName("");
        setpatientAge("");
        setrecordingDate("");
        setsoundFile(null);
      }

      console.log('Form data submitted successfully');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }

  };

  if (data) {
    const binaryData = data?.formData.soundFile.data.data;
    const arrayBuffer = Buffer.from(binaryData, 'binary').buffer;
  }

  return (

    <>
      <div className='form-bg'>
        <div className='heading'>JEEVA AI - Assignment</div>
        <form >
          <div className='fullscreen'>
            <div className='Input-Header'>
              Doctor's Name :
              <input className='inputfield' onChange={(e) => { setDoctorName(e.target.value) }} value={doctorName} type='text' placeholder="Enter Doctor's name here"></input>
            </div>
            <div className='Input-Header'>
              Patient's Name :
              <input className='inputfield' onChange={(e) => { setpatientName(e.target.value) }} value={patientName} type='text' placeholder="Enter Patient's name here"></input>
            </div>
            <div className='Input-Header'>
              Patient’s Age:
              <input
                className='inputfield'
                onChange={(e) => {
                  const age = parseInt(e.target.value);
                  if ((age >= 0 && age <= 1000) || e.target.value === '') {
                    setpatientAge(age);
                  }
                }}
                value={patientAge}
                type='number'
                placeholder="Enter Patient's Age here"></input>
            </div>
            <div className='Input-Header'>
              Date of the sound recording :
              <input className='inputfield' onChange={(e) => { setrecordingDate(e.target.value) }} value={recordingDate} type='date' placeholder="Enter Doctor's name here"></input>
            </div>
            <div className='Input-Header'>
              Upload a sound file :
              <input className='inputfieldd' onChange={(e) => { setsoundFile(e.target.files[0]) }} type='file' placeholder="Enter Doctor's name here"></input>
            </div>
            <div className='submitButton'>
              <button className='submitButton1' onClick={submitHandler}>Submit</button>
            </div>
            <div className='message'>{message}</div>
          </div>
        </form>
        {/* <div>
          <table>
            <thead>
              <tr>
                <th>Doctor's Name</th>
                <th>Patient's Name</th>
                <th>Patient's Age</th>
                <th>Recording Date</th>
                <th>Sound File</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data?.formData.doctorName}</td>
                <td>{data?.formData.patientName}</td>
                <td>{data?.formData.patientAge}</td>
                <td>{data?.formData.recordingDate}</td>
                <td>
                  <audio controls ref={audioElement}>
                  </audio>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div className='lastresponse'>
          <div className='lastresponse-heading'>
            {lastSubmissionCheck ? "Last Submitted Response" : "No Response Available"}
          </div>
          {lastSubmissionCheck ? (<div className='gridtable'>
            <div className='lastresponse-data'>
              <div className='lastresponse-data-text'>Doctor's Name:</div>
              <div>{data?.formData.doctorName}</div>
            </div>
            <div className='lastresponse-data'>
              <div className='lastresponse-data-text'>Patient's Name:</div>
              <div>{data?.formData.patientName}</div>
            </div>
            <div className='lastresponse-data'>
              <div className='lastresponse-data-text'>Patient's Age:</div>
              <div>{data?.formData.patientAge}</div>
            </div>
            <div className='lastresponse-data'>
              <div className='lastresponse-data-text'>Recording Date:</div>
              <div>{data?.formData.recordingDate.split('T')[0]}</div>
            </div>
            <div className='lastresponse-data'>
              <div className='lastresponse-data-text'>Sound File:</div>
              <div><audio controls ref={audioElement}></audio></div>
            </div>
          </div>) : (null)}
        </div>
      </div>
    </>
  );
}

export default App;
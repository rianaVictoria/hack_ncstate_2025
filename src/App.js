import logo from './logo.svg';
import './App.css';
import { Auth } from "./components/auth";
import {db, auth} from "./config/firebase"
import {getDocs, collection , addDoc, GeoPoint, Timestamp, serverTimestamp, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import NearMeComponent from './components/NearMeComponent'
import { NavLink } from 'react-router-dom'


function App() {
  const [logList, setLogList] = useState([]);

  //new log states
  const [newLogName, setNewLogName] = useState("")
  // const [timestamp, setTimestamp] = useState(Date.now());
  const [newLogDescription, setNewLogDescription] = useState("")
  const [newLogPriority, setNewLogPriority] = useState(0)
  const [newLogLatitude, setNewLogLatitude] = useState("")
  const [newLogLongitude, setNewLogLongitude] = useState("")
  const [newLogStatus, setNewLogStatus] = useState("Received")

  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const logListCollectionRef = collection(db, "logs");

  const getLogList = async () => {
    //read data
    //set state to data
    try {
    const data = await getDocs(logListCollectionRef);
    const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,

    }));
    setLogList(filteredData);
    } catch (err) {
      console.error(err);
    }

  };

 

  useEffect(() => {
    getLogList();

  }, []);

  const onSubmitLog = async () =>
 {
  try {
  await addDoc(logListCollectionRef, {name: newLogName, Location: new GeoPoint(newLogLatitude, newLogLongitude), description: newLogDescription, priorityLevel: newLogPriority, dateReported: serverTimestamp(), Status: newLogStatus, userId:auth?.currentUser?.uid});
  getLogList();
  } catch (err) {
    console.error(err);
  }
 }

 const updateLog = async (id) => {
  const logDoc = doc(db, "logs", id);
  await updateDoc(logDoc, { name: updatedName , description: updatedDescription});
  getLogList();
};
 
 const deleteLog = async (id) => {
  const logDoc = doc(db, "logs", id);
  await deleteDoc(logDoc);
  getLogList();
};

  return (
    <>

    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/' element = { <NearMeComponent /> }></Route>

		
      </Routes>
 
    
    
    <div className="App"> 
      <Auth />

      <div>
        <input placeholder="Issue Name" onChange={(e) => setNewLogName(e.target.value)}/>
        <input placeholder="Issue Description" onChange={(e) => setNewLogDescription(e.target.value)}/>
        <input placeholder="Priority" type="number" onChange={(e) => setNewLogPriority(Number(e.target.value))}/>
        {/* <input type="datetime-local" id="timestampInput" name="timestamp" onChange={(e) => setTimestamp(Date(e.target.getValue).getTime())}/> */}
        <input placeholder="Latitude" onChange={(e) => setNewLogLatitude(parseFloat(e.target.value))}/>
        <input placeholder="Longitude" onChange={(e) => setNewLogLongitude(parseFloat(e.target.value))}/>

        <button onClick={onSubmitLog}>Submit Report</button>


      </div>
      
      <div>
        {logList.map((log) => (
          <div>
            <h1 style={{color: log.priorityLevel < 3 ? "red" : log.priorityLevel < 6 ? "orange" : "teal"}} > {log.name}</h1>
              <p> Description: {log.description} </p>
              <button onClick={() => deleteLog(log.id)}> Delete Report</button>

              <input placeholder="New Name" onChange={(e) => setUpdatedName(e.target.value)} />
              <input placeholder="New Description" onChange={(e) => setUpdatedDescription(e.target.value)} />
              <button onClick={() => updateLog(log.id)}>{" "}Update Log</button>
          </div>
        ))}
      </div>


      
    </div>

    <FooterComponent />
    </BrowserRouter>
    </> 
  );
}

export default App;

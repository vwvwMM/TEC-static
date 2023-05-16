import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Activity, ParticipantList, ParticipantDetail } from './view';
import { useState } from 'react';
function App() {
  const [helps, setHelps] = useState([]);
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/activities" element={<Activity/>} />
          <Route path="/activity/:id" element={<ParticipantList/>} />
          <Route path="/participant/:id" element={<ParticipantDetail helps={helps} setHelps={setHelps} />} />
        </Routes>
    </Router>
  );
}

export default App;

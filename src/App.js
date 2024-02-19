
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Login }from './components/Login';
import { Signup } from './components/Signup';
import { Landing } from './components/Landing';
import { Profile } from './components/Profile';
import { Home} from './components/Home';
// import {Report} from './components/Report';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/home' element={<Home />} />
          {/* <Route exact path='/report' element={<Report />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

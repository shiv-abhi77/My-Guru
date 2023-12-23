import logo from './logo.svg'
import './App.css';
import Login from './components/account/Login';
import DataProvider from './context/DataProvider';
import StudentHome from './components/home/StudentHome';
import MentorHome from './components/home/MentorHome';
import { Route } from 'react-router-dom';
import {BrowserRouter, Routes} from 'react-router-dom';
import Header from './components/header/Header';
import MentorProfile from './components/profile/MentorProfile';

function App() {
  return (
    
          <DataProvider>
        <BrowserRouter>
          <Header/>
        <div style={{marginTop:64}}>
            <Routes>
              {/* <Route path = '/login' element = {<Login/>}/> */}
              <Route  path = '/student/home' element = {<StudentHome/>}/>
              <Route  path = '/mentor/home' element = {<MentorHome/>}/>
              <Route  path = '/login' element = {<Login/>}/>
              <Route  path = '/mentor/profile' element = {<MentorProfile/>}/>
            </Routes>
          </div>
        </BrowserRouter>
     </DataProvider>
    
  );
}

export default App;

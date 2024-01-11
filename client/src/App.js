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
import MentorPosts from './components/posts/MentorPosts';
import CreatePost from './components/posts/CreatePost';
import MentorPublicProfile from './components/profile/MentorPublicProfile';
import StudentProfile from './components/profile/StudentProfile';
import StudentExplore from './components/home/StudentExplore';
import StudentBookmarked from './components/posts/StudentBookmarked';
import FindMentors from './components/mentors/FindMentors';
import StudentMentors from './components/mentors/StudentMentors';
import StudentForYou from './components/home/StudentForYou';
import StudentPlans from './components/mentors/StudentPlans';
import StudentChats from './components/mentors/StudentChats';
import MentorChats from './components/mentors/MentorChats';
import MentorPlansList from './components/mentors/MentorPlansList';
import MentorStudents from './components/mentors/MentorStudents';

import RoomPage from './components/video_call/Room/mentor_call';
import RoomPage2 from './components/video_call/Room/student_call';



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
              <Route  path = '/student/profile' element = {<StudentProfile/>}/>
              <Route  path = '/student/explore' element = {<StudentExplore/>}/>
              <Route path  = '/student/bookmarked' element = {<StudentBookmarked/>}/>
              <Route path  = '/student/findmentors' element = {<FindMentors/>}/>
              <Route path  = '/student/yourmentors' element = {<StudentMentors/>}/>
              <Route path  = '/student/foryou' element = {<StudentForYou/>}/>
              <Route path  = '/student/yourplans' element = {<StudentPlans/>}/>
              <Route  path = '/mentor/posts' element = {<MentorPosts/>}/>
              <Route  path = '/mentor/createpost' element = {<CreatePost/>}/>
              <Route  path = '/student/mentor/profile/:mentorAccountId' element = {<MentorPublicProfile/>}/>
              <Route  path = '/mentor/public' element = {<MentorPublicProfile/>}/>
              <Route  path = '/student/chats/:chatId' element = {<StudentChats/>}/>
              <Route  path = '/mentor/chats/:chatId' element = {<MentorChats/>}/>
              <Route  path = '/mentor/yourplans' element = {<MentorPlansList/>}/>
              <Route  path = '/mentor/plan/:planId/yourstudents' element = {<MentorStudents/>}/>
              <Route path='/mentor/video_call/:roomId' element = {<RoomPage/>} />
              <Route path='/student/video_call/:roomId' element = {<RoomPage2/>} />
            </Routes>
          </div>
        </BrowserRouter>
     </DataProvider>
    
  );
}

export default App;

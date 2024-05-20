import { useState, useEffect, useContext } from "react"
import { useNavigate, Link, useParams, useLocation } from "react-router-dom"
import MentorItem from "./MentorItem"
import StudentSidebar from "../sidebar/StudentSidebar"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utils/util"
import '../../css/studentMentors.css'
const StudentMentors = () => {
    const navigate = useNavigate()
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const [data, setData] = useState([])
    useEffect(() => {
        const myFunction = async() => {
            const url = `http://localhost:8000/getYourMentors?studentAccountId=${account.id}`;
                const settings = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization : getAccessToken()
                }
                };
                try {
                    const fetchResponse = await fetch(url, settings);
                    const response = await fetchResponse.json();
                    console.log(response.data)
                    setData(response.data);
                    
                    } catch (e) {
                    console.log(e);
                    }
          }
          myFunction()
    }, [])
    




    return(
        <>
            <div style={{
            display:'flex',
            flexDirection:'row',
            
          }}>
                <StudentSidebar/>
                <div style={{
                width:'100%',
                display:'flex',
                fontFamily:'DM Sans'
                }}> 

                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        width:'80%',
                    }}>
         {
                data && data.length > 0 ? data.map(e => (
                    <div >
                            <div style={{
                                display:'flex',
                                flexDirection:'column'
                            }}>
                                <div onClick={() => {navigate(`/student/mentor/profile/${e.mentor.mentorAccountId}`)}} >
                                    <MentorItem  mentor = {e.mentor}/>
                                </div>
                                
                                
                                <div className="btns-container">
                                    <div className="chats-btn"
                                    onClick={() => {navigate(`/student/chats/${e.chatId}`)}}
                                    >
                            Chats
                            </div>

                                    <div className="video-call-btn"
                                    onClick={() => {navigate(`/student/video_call/${e.chatId}`)}}
                                    >
                            Video Call
                            </div>
                                </div>
                            </div>
                            
                    </div>
                ))
                :
                console.log('no data to show')
        }
        </div>
            </div>
        </div>
        </>
    )
}
export default StudentMentors
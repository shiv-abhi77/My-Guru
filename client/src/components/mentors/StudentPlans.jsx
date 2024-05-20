import { useState, useEffect, useContext } from "react"
import { useNavigate, Link, useParams, useLocation } from "react-router-dom"
import MentorItem from "./MentorItem"
import StudentSidebar from "../sidebar/StudentSidebar"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utils/util"
import dayjs from "dayjs"
import '../../css/mentorPlansList.css'

const StudentPlans = () => {
    const navigate = useNavigate()
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const [plans, setPlans] = useState([])


    useEffect(() => {
        const myFunction = async() => {
            const url = `http://localhost:8000/getYourPlans?studentAccountId=${account.id}`;
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
                    setPlans(response.data);
                    
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
                    


                    <div style={{
                            display:'flex',
                            flexDirection:'column',
                            fontFamily:'DM Sans'
                        }}>
                {
                    plans &&  plans.length > 0 ? plans.map((plan) => (
                        
                        
                        <div className="plan-container">
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            

                        }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'column'
                        }}>
                            <div style={{
                                color:'black',
                                fontSize:'18px',
                                width:750
                                
                            }}>
                            {`No. of video calls: ${plan.videoCalls}`}
                            </div>

                            <div className="streams">
                            {`No. of streams: ${plan.streams}`}
                            </div>

                            <div className="posts">
                            {`No. of posts/articles: ${plan.posts}`}
                            </div>

                            <div className="other-perks">
                            {`Other perks: ${plan.otherPerks}`}
                            </div>
                            <div className="price">
                            {`Price of plan(in Rs per month): ${plan.price}`}
                            </div>
                            <div className="amount">
                            {`Amount paid(in Rs): ${plan.amount}`}
                            </div>
                            <div className="purchase">
                            {`Purchase date: ${new Date(plan.purchaseTimestamp)}`}
                            </div>

                        </div>
                            
                        <div className="view-btn"
                        onClick={() => {navigate(`/student/mentor/profile/${plan.mentorAccountId}`)}}
                        >
                            View mentor
                            </div>
                        </div>
                        </div>
                   ))
                   :
                   console.log('No Plan details')
                }
                </div>

                </div>

                </div>
                </div>
        </>
    )
}
export default StudentPlans
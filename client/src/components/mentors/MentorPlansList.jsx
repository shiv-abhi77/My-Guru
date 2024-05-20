import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams, Link, useLocation } from "react-router-dom"
import MentorSidebar from "../sidebar/MentorSidebar"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utils/util"
import '../../css/mentorPlansList.css'


const MentorPlansList = () => {
    const navigate = useNavigate()
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const [plans, setPlans] = useState([])

    useEffect(() => {
        const myFunction = async() => {
            const url = `http://localhost:8000/getMentorPlans?mentorAccountId=${account.id}`;
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
                <MentorSidebar/>
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
                            
                            

                        </div>
                            
                        <div className="view-btn"
                        onClick={() => {navigate(`/mentor/plan/${plan._id}/yourstudents`)}}
                        >
                            View students enrolled
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
export default MentorPlansList
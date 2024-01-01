import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import StarIcon from '@mui/icons-material/Star';

const MentorItem = ({mentor}) => {
    return(
        <>
            <div style={{
                display:'flex',
                flexDirection:'row',
                cursor:'pointer',
                marginTop:'10px',
                background:'#f2f2f2',
                borderRadius:'5px'
            }}>

            {/* Image div start */}
                <div style={{
                    display: 'block',
                    minWidth: '40px',
                    borderRadius:'25px',
                    background:'#cda8ff',
                    width:'40px',
                    height:'40px',
                    marginTop:'8px'
                }}>
                    <img src={mentor.mentorImage && mentor.mentorImage !== ""?mentor.mentorImage:'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'}alt="Mentor Image" style={{
                   
                   display: 'block',     
                   width: '100%',
                   minWidth: '100%',
                   height: '100%',
                   minHeight: '100%',
                   borderWidth: '0px',
                   outline: 'none' ,
                   borderRadius:'60px',
                   objectFit:'cover'
           }} />
                
                </div>

                {/* Image div end */}
                {/* Mentor content div start */}
        <div style={{
            display:'flex',
            flexDirection:'row',
            marginTop:'6px',
            marginLeft:'10px',
            
            width:'100%',
            padding:'8px'
        }}>

        
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    
                }}>
                     <div style={{
                        fontFamily:'DM Sans',
                        fontSize:'16px',
                        fontWeight:'700',
                        color:'black'
                    }}>
                        {mentor.mentorName}
                    </div>


                    <div style={{
                        fontFamily:'DM Sans',
                        fontSize:'14px',
                        color:"rgba(0, 0, 0, 0.6)"
                    }}>
                        {mentor.mentorTagline}
                    </div>

                    <div style={{
                        fontFamily:'DM Sans',
                        fontSize:'14px',
                        color:"rgba(0, 0, 0, 0.6)"
                    }}>
                        {mentor.mentorStudentsCount} students mentored
                    </div>

                    {/* <div style={{
                        display:'flex',
                        flexDirection:'row',
                        marginBottom:'10px'
                    }}>Exams:
                    {
                    
                    mentor.mentorExams.map((exam) =>
                        (
                        <div>
                        <div  style={{
                        background:'#d5d5d5',
                        color: '#566474',
                        fontSize:'12px',
                        borderRadius:'20px',
                        width:'fit-content',
                        padding:'4.5px 10px',
                        fontWeight:'400',
                        display:'flex',
                        flexDirection:'row',
                        fontFamily: "DM Sans",
                        marginRight:'5px'
                    }}>
                             <div>
                                {exam}
                            </div>
                            </div>
                        </div>
                        ))
                }

                </div>

                <div style={{
                        display:'flex',
                        flexDirection:'row',
                        marginBottom:'10px'
                    }}>Subjects:
                    {
                    
                    mentor.mentorSubjects.map((subject) =>
                        (
                        <div>
                        <div  style={{
                        background:'#d5d5d5',
                        color: '#566474',
                        fontSize:'12px',
                        borderRadius:'20px',
                        width:'fit-content',
                        padding:'4.5px 10px',
                        fontWeight:'400',
                        display:'flex',
                        flexDirection:'row',
                        fontFamily: "DM Sans",
                        marginRight:'5px'
                    }}>
                             <div>
                                {subject}
                            </div>
                            </div>
                        </div>
                        ))
                }

                </div> */}

                </div>
                <div style={{
                    marginRight:'5px',
                    marginLeft:'auto',
                    display:'flex',
                    fontFamily:'DM Sans',
                    fontSize:'20px',
                    justifyContent:'center'
                }}>
                    {mentor.mentorRating}<StarIcon/>
                </div>
</div>
                {/* Mentor content div end */}
                {/* {Rating div start} */}
                
                {/* {Rating div end} */}

                <div>

                </div>
            </div>
        </>
    )
}
export default MentorItem
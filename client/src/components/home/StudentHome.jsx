
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import dayjs from "dayjs";
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getAccessToken } from "../../utils/util";
import ImageIcon from '@mui/icons-material/Image';
import { getType } from "../../utils/util";
import MentorPost from "../posts/MentorPost";
import StudentSidebar from "../sidebar/StudentSidebar";
const StudentHome = () =>{
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const [posts, setPosts] = useState({})

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
                justifyContent:'center',
                fontFamily:'DM Sans'
                }}>     

                <div style={{
                display:'flex',
                flexDirection:'column',
                width:'100%'
                }}>

                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    height:'250px',
                    background:'#97a0d8',
                    borderRadius:'5px',
                    justifyContent:"center",
                    alignItems:'center',
                    fontFamily:'DM Sans'
                }}>

                    <div style={{
                        fontSize:'40px'
                    }}>
                        Top Mentors/Consultants At One Place
                    </div>
                    <div style={{
                        fontSize:'70px',
                        fontWeight:'700',
                        color:'#04274a'
                    }}>
                        MyGuru
                    </div>
                    
                    <div style={{
                        fontSize:'25px'
                    }}>
                        Get Mentorship From Various Subject Experts
                    </div>
                    <div style={{
                        fontSize:'25px'
                    }}>
                        Unleash Your True Potential By Getting Best Mentorship
                    </div>
                </div>

                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    marginTop:'10px',
                    padding:'10px',
                    fontFamily:'DM Sans',
                    justifyContent:'space-between'
                }}>
                <div>

                        <div style={{
                            fontSize:'18px',
                            padding:'5px',
                            borderRadius:'5px',
                            background:'aliceblue',
                            fontWeight:'700'
                        }}>
                            Top Experts in AIEEE
                        </div>

                        <div style={{
                            marginTop:'5px',
                            background:'aliceblue',
                            borderRadius:'5px',
                        }}>

                        </div>

                </div>

                <div>
                        <div style={{
                            fontSize:'18px',
                            padding:'5px',
                            borderRadius:'5px',
                            background:'aliceblue',
                            fontWeight:'700'
                        }}>
                            Top Experts in AIEEE
                        </div>

                        <div style={{
                            marginTop:'5px',
                            background:'aliceblue',
                            borderRadius:'5px',
                        }}>
                            
                        </div>
                </div>
                <div>
                        <div style={{
                            fontSize:'18px',
                            padding:'5px',
                            borderRadius:'5px',
                            background:'aliceblue',
                            fontWeight:'700'
                        }}>
                            Top Experts in AIEEE
                        </div>

                        <div style={{
                            marginTop:'5px',
                            background:'aliceblue',
                            borderRadius:'5px',
                        }}>
                            
                        </div>
                </div>

                </div>

                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    marginTop:'10px',
                    padding:'10px',
                    fontFamily:'DM Sans',
                    justifyContent:'space-between'
                }}>
                <div>
                        <div style={{
                            fontSize:'18px',
                            padding:'5px',
                            borderRadius:'5px',
                            background:'aliceblue',
                            fontWeight:'700'
                        }}>
                            Top Experts in AIEEE
                        </div>

                        <div style={{
                            marginTop:'5px',
                            background:'aliceblue',
                            borderRadius:'5px',
                        }}>
                            
                        </div>
                </div>

                <div>
                        <div style={{
                            fontSize:'18px',
                            padding:'5px',
                            borderRadius:'5px',
                            background:'aliceblue',
                            fontWeight:'700'
                        }}>
                            Top Experts in AIEEE
                        </div>

                        <div style={{
                            marginTop:'5px',
                            background:'aliceblue',
                            borderRadius:'5px',
                        }}>
                            
                        </div>
                </div>
                <div>
                        <div style={{
                            fontSize:'18px',
                            padding:'5px',
                            borderRadius:'5px',
                            background:'aliceblue',
                            fontWeight:'700'
                        }}>
                            Top Experts in AIEEE
                        </div>

                        <div style={{
                            marginTop:'5px',
                            background:'aliceblue',
                            borderRadius:'5px',
                        }}>
                            
                        </div>
                </div>

                </div>

                </div>
            </div>
        </div>
   </>
    );
}

export default StudentHome;
import MentorSidebar from "../sidebar/MentorSidebar"
import { TextField } from "@mui/material"
import { DataContext } from "../../context/DataProvider"
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import exams from "../../constants/exams.js"
import subjects from "../../constants/subjects.js"
import CloseIcon from '@mui/icons-material/Close';
import { getAccessToken } from "../../utils/util.js"
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Button} from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MentorEducation from "./MentorEducation.jsx"
import MentorExperiences from "./MentorExperiences.jsx"
import MentorAchievements from "./MentorAchievements.jsx"
import MentorStatistics from "./MentorStatistics.jsx"
import MentorReviews from "./MentorReviews.jsx"
import MentorPlans from "./MentorPlans.jsx"
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  




const MentorProfile = () => {
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const mentorObjInitial = {
            mentorAccountId:account.id,
                mentorName:'',
                mentorEmail:'',
                mentorContact:'',
                rating:5,
                mentorTagline:'',
                mentorExams:[],
                mentorSubjects:[],
                mentorFollowers:[],
                mentorPosts:[],
                mentorPlans:[],
                education:[],
                workExperiences:[],
                achievements:[],
                reviewsGot:[],
                mentorChats:[],
                statistics:{},
                
    }
    const [mentor, setMentor] = useState(mentorObjInitial)
    const handleTextFieldsChange = (e) => {
        setMentor({...mentor, [e.target.name]: e.target.value});
        console.log(mentor)
    }
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleExamSelect = (e) => {
        setMentor({...mentor, mentorExams:[...mentor.mentorExams, e.target.value]});
        console.log(mentor)
    }
    const handleDeleteExam = (exam) => {
        setMentor({...mentor, mentorExams:mentor.mentorExams.filter((e)=>{
            if(e !== exam) return e;
        })});
        console.log(mentor)
    }
    const handleSubjectSelect = (e) => {
        setMentor({...mentor, mentorSubjects:[...mentor.mentorSubjects, e.target.value]});
        console.log(mentor)
    }
    const handleDeleteSubject = (exam) => {
        setMentor({...mentor, mentorSubjects:mentor.mentorSubjects.filter((e)=>{
            if(e !== exam) return e;
        })});
        console.log(mentor)
    }

    const updateProfile = async() => {
        
        const settings = {
         method: "POST",
         body: JSON.stringify(mentor),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
             'authorization' : getAccessToken()
         }
         }
         try {
             console.log(settings.body)
             const fetchResponse = await fetch(`http://localhost:8000/updateMentorProfile?mentorAccountId=${account.id}`, settings);
             const response = await fetchResponse.json();
            
             
         } catch (e) {
             
             return e;
         }    
    }


    useEffect(() => {
        const myFunction = async() => {
          const url = `http://localhost:8000/getMentorProfile?mentorAccountId=${account.id}`;
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
              setMentor(response);
              
              } catch (e) {
              console.log(e);
              }
        }
        myFunction();
      }, [])

    return(
        <>
            <div style={{
            display:'flex',
            flexDirection:'row',
            
          }}>
                <MentorSidebar/>
                <div style={{
                display:'flex',
                width:'100%',
                fontSize:'20px',
                color:'black',
                
               
                fontFamily:'DM Sans',
                background:'#94b3e7',
                }}>


            <div style={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                fontSize:'15px',
                fontFamily:'DM Sans',
               
            }}>
             <div style={{
                display:'flex',
                flexDirection:'row'
            }}>

            

            <div style={{
                display:'flex',
                flexDirection:'column',
                
            }}>
                <div style={{
                    color:'black'
                }}>
                     Name
                </div>

                <div style={{
                    background:'#d8ebf0'
                }}>
                    <TextField
                        name="mentorName"
                        value={mentor.mentorName}
                        onChange={(e) => {
                            handleTextFieldsChange(e)
                        }}
                        id="filled-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        style={{width:300}}
                        variant="filled"
                        />
                </div>
            </div>
            <div style={{
                display:'flex',
                flexDirection:'column',  
                marginLeft:'20px'
            }}>
                <div style={{
                    color:'black'
                }}>
                     Email
                </div>

                <div style={{
                    background:'#d8ebf0'
                }}>
                    <TextField
                        name="mentorEmail"
                        value={mentor.mentorEmail}
                        onChange={(e) => {
                            handleTextFieldsChange(e)
                        }}
                        id="filled-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        style={{width:300}}
                        variant="filled"
                        />
                </div>
            </div>
            </div>
            <div style={{
                display:'flex',
                flexDirection:'row',
                marginTop:'10px'
            }}>

            

            <div style={{
                display:'flex',
                flexDirection:'column',  
            }}>
                <div style={{
                    color:'black'
                }}>
                     Contact
                </div>

                <div style={{
                    background:'#d8ebf0'
                }}>
                    <TextField
                        name="mentorContact"
                        value={mentor.mentorContact}
                        onChange={(e) => {
                            handleTextFieldsChange(e)
                        }}
                        id="filled-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        style={{width:300}}
                        variant="filled"
                        />
                </div>
            </div>
            <div style={{
                display:'flex',
                flexDirection:'column',  
                marginLeft:'20px'
            }}>
                <div style={{
                    color:'black'
                }}>
                    Tagline
                </div>

                <div style={{
                    background:'#d8ebf0'
                }}>
                    <TextField
                        name="mentorTagline"
                        value={mentor.mentorTagline}
                        onChange={(e) => {
                            handleTextFieldsChange(e)
                        }}
                        id="filled-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={4}
                        style={{width:300}}
                        variant="filled"
                        />
                </div>
            </div>
            </div>

            <div style={{
                display:'flex',
                flexDirection:'row',
                marginTop:'10px'
            }}>

                <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px',
            }}>
                <div style={{
                    color:'black'
                }}>
                    Exams
                </div>

                <div style={{
                    width:500,
                }}>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        onChange={(e) => {
                            handleExamSelect(e)
                        }}
                        value={mentor.mentorExams[mentor.mentorExams.length-1]}
                        defaultValue={30}
                        inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}
                    >
                    {
                        exams.map((exam) =>
                        (
                            <option  value={exam}>{exam}</option>
                        ))
                    
                    }
                        
                    </NativeSelect>

                </FormControl>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    maxHeight:'50px',
                    overflowY:'auto',
                    flexWrap:'wrap'
                }}>

                        

                {
                    
                    mentor.mentorExams.map((exam) =>
                        (
                        <div>
                        <div  style={{
                        background:'#27538b',
                        color:'white',
                        marginTop:'1px',
                        borderRadius:'20px',
                        width:'fit-content',
                        padding:'5px',
                        display:'flex',
                        flexDirection:'row'
                    }}>
                            <div>
                                {exam}
                            </div>
                            <div>
                            <CloseIcon  onClick={() => {handleDeleteExam(exam)}} style={{
                                cursor:'pointer'
                            }}/>
                            </div>
                            </div>
                        </div>
                        ))
                }
                    
                        
                   
                </div>
                </div>
            </div>
            <div style={{
                display:'flex',
                flexDirection:'column',
                marginTop:'15px',
                marginLeft:'20px'
            }}>
                <div style={{
                    color:'black'
                }}>
                    Subjects
                </div>

                <div style={{
                    width:500,
                }}>
                <FormControl fullWidth>
                    
                    <NativeSelect
                        onChange={(e) => {
                            handleSubjectSelect(e)
                        }}
                        value={mentor.mentorSubjects[mentor.mentorSubjects.length-1]}
                        defaultValue={30}
                        inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}
                    >
                    {
                        subjects.map((subject) =>
                        (
                            <option  value={subject}>{subject}</option>
                        ))
                    
                    }
                        
                    </NativeSelect>

                </FormControl>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    maxHeight:'50px',
                    overflowY:'auto',
                    flexWrap:'wrap'
                }}>

                        

                {
                    
                    mentor.mentorSubjects.map((subject) =>
                        (
                        <div>
                        <div  style={{
                        background:'#27538b',
                        marginTop:'1px',
                        color:'white',
                        borderRadius:'20px',
                        width:'fit-content',
                        padding:'5px',
                        display:'flex',
                        flexDirection:'row'
                    }}>
                            <div>
                                {subject}
                            </div>
                            <div>
                            <CloseIcon  onClick={() => {handleDeleteSubject(subject)}} style={{
                                cursor:'pointer'
                            }}/>
                            </div>
                            </div>
                        </div>
                        ))
                }
                    
                        
                   
                </div>
                </div>
            </div>
            

            </div>
            <div style={{
                    fontSize:'16px',
                    fontFamily:'DM Sans',
                    marginTop:'10px',
                    backgroundColor:'#142683',
                    borderRadius:'5px',
                    fontWeight:400,
                    cursor:'pointer',
                    padding: '4px 4px 8px 4px',
                    color:'white',
                    width:'fit-content'
                }}
                onClick={()=>{updateProfile()}}
                >Save Changes</div>

                <Box style = {{
                width:'100%',
                marginTop:'20px'
            }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Education" {...a11yProps(0)} />
                        <Tab label="Experiences" {...a11yProps(1)} />
                        <Tab label="Awards and Achievements" {...a11yProps(2)} />
                        <Tab label="Reviews" {...a11yProps(3)} />
                        <Tab label="Statistics" {...a11yProps(4)} />
                        <Tab label="Plans" {...a11yProps(5)} />
                        </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <MentorEducation 
                        mentor={mentor}
                        onUpdate={(state) => {setMentor(state)}}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <MentorExperiences
                        mentor={mentor}
                        onUpdate={(state) => {setMentor(state)}}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <MentorAchievements 
                        mentor={mentor}
                        onUpdate={(state) => {setMentor(state)}}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={3}>
                    <MentorStatistics 
                        mentor={mentor}
                        onUpdate={(state) => {setMentor(state)}}
                    />
                </CustomTabPanel>


                <CustomTabPanel value={value} index={4}>
                    <MentorReviews 
                        mentor={mentor}
                        onUpdate={(state) => {setMentor(state)}}
                    />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={5}>
                    <MentorPlans 
                        mentor={mentor}
                        onUpdate={(state) => {setMentor(state)}}
                    />
                </CustomTabPanel>
            </Box>
    </div>
    
            </div>
            </div>
        </>
    )
}
export default MentorProfile
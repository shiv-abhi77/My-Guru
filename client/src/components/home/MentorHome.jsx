import Header from "../header/Header";
import MentorSidebar from "../sidebar/MentorSidebar";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TextField } from "@mui/material";
import { Button } from '@mui/material';
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
const MentorHome = () =>{
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const [open, setOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null)
    const postInitialValues = {
        postAccountId:account.id,
        postLikes:[],
        postComments:[],
        postTitle:'',
        postBody:'',
        postImage:'',
        postTimestamp:dayjs(new Date()),
    };
    const [postState, setPost] = useState(postInitialValues)

    const handleClickOpen = () => {
        setPost(postInitialValues)
        setOpen(true);
    };

    const handleClose = () => {
        setPost(postInitialValues)
        setOpen(false);
  };
  const addNewPostApi = async()=> {
    
    let newPost = postState
    newPost.postTimestamp = dayjs(new Date());
    const settings = {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'authorization' : getAccessToken()
        }
        }
        try {
            console.log(settings.body)
            const fetchResponse = await fetch(`http://localhost:8000/createPost?mentorAccountId=${account.id}`, settings);
            const response = await fetchResponse.json();
            setPost(postInitialValues)
            handleClose()
        } catch (e) {
            setPost(postInitialValues)
            return e;
        }    
}

    useEffect(() => {
      const storeImageAndGetLink = async() => {
        
        if(imageFile){
            const data = new FormData();
            data.append("name", imageFile.name);
            data.append("file", imageFile);
            
            const settings = {
                method: "POST",
                body: data,
                headers: {
                    'authorization' : getAccessToken()
                },
                
                }
                try {
                    const fetchResponse = await fetch(`http://localhost:8000/image/upload`, settings);
                    const response = await fetchResponse.json();
                    setPost({...postState, postImage:response});
                    
                } catch (e) {
                    
                    return e;
                }
        }
      }
      storeImageAndGetLink();
    }, [imageFile])
    
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
                justifyContent:'center',
                fontFamily:'DM Sans'
                }}>     

                <div style={{
                display:'flex',
                flexDirection:'column'
                }}>

            
                <div >
                <TextField
                onClick={() => handleClickOpen()}
                inputProps={{
                    style: {color:'black',fontSize:'14px',fontWeight:'400', borderRadius:'35px', border:'1px solid black', padding:'10px' },
                }}
                placeholder="Start a post"
                 id="outlined-basic" 
                 variant="standard" 
                 InputProps={{
                    disableUnderline: true,
                    style:{
                        width:600,
                        }
                    }}
                 />
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Start new post</DialogTitle>
                    <DialogContent>
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        flexDirection:'column',
                        marginTop:'10px',
                        fontSize:'15px'}}>

                        {/* Start of school name */}
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginTop:'15px'
                    }}>
                        <div style={{
                            color:'black'
                        }}>
                            Post Title
                        </div>

                        <div>
                            <TextField
                                name="postTitle"
                                value={postState.postTitle}
                                onChange={(e) => {
                                    setPost({...postState, [e.target.name]: e.target.value})
                                    console.log(postState)
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={4}
                                variant="filled"
                                    style={{width:500}}
                                />
                        </div>
                </div>
                <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginTop:'15px'
                    }}>
                        <div style={{
                            color:'black'
                        }}>
                            What you want to talk about? 
                        </div>

                        <div>
                            <TextField
                                name="postBody"
                                value={postState.postBody}
                                onChange={(e) => {
                                    setPost({...postState, [e.target.name]: e.target.value})
                                    console.log(postState)
                                }}
                                id="filled-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={10}
                                variant="filled"
                                    style={{width:500}}
                                />
                        </div>
                </div>
                <div style={{
                        display:'flex',
                        flexDirection:'column',
                        marginTop:'15px'
                    }}>
                        <div style={{
                            color:'black'
                        }}>
                            Attach an image
                        </div>
                        <div>
                            <FormControl>
                                <label htmlFor="fileInput">
                                <ImageIcon style={{
                                    cursor:'pointer',
                                    fontSize:'30px'
                                }}/>
                                </label>
                                <input type="file"
                                id="fileInput"
                                
                                style={{
                                    display:'none'
                                }}
                                onChange={(e) => setImageFile(e.target.files[0])}
                                >
                                
                                </input>
                            </FormControl>
                        </div>
                        
                </div>
                {/* Start of date of education */}

                    
                {/* End of date of education */}
                </div>
                {/* End of school name */}
                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>{addNewPostApi(postState)}}>Save</Button>
                    </DialogActions>
             </Dialog>

            
            
            </div>
            </div>
        </div>
        </>
    );
}

export default MentorHome;
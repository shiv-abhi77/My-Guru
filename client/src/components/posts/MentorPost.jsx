import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { DataContext } from '../../context/DataProvider';
import { getAccessToken } from '../../utils/util';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import {FormControl} from '@mui/material';
import {Button} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
const MentorPost = ({post, saved, mentorName, mentorTagline, mentorImage}) => {
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
        postTimestamp:'',
    };
    const [postState, setPost] = useState(post)
    const [tempPostState, setTempPost] = useState(postState)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTempPost(postInitialValues)
        setOpen(false);
  };
  const updatePost = async(postId) =>{
    console.log(postState)
    const settings = {
     method: "POST",
     body: JSON.stringify(tempPostState),
     headers: {
         "Content-type": "application/json; charset=UTF-8",
         'authorization' : getAccessToken()
     }
     }
     try {
         console.log(settings.body)
         const fetchResponse = await fetch(`http://localhost:8000/updatepost?postId=${postId}`, settings);
         const response = await fetchResponse.json();
         
        setPost(tempPostState)
        handleClose()
     } catch (e) {
         
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
                  setTempPost({...tempPostState, postImage:response});
                  
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
                flexDirection:'column',
                padding:'18px',
                border:'1px solid #c1bcbc',
                borderRadius:'5px',
                marginTop:'10px'
            }}>

                <div style={{
                    display:'flex',
                    flexDirection:'row',

                }}>

                
                <div style={{
                    display: 'block',
                    minWidth: '70px',
                    borderRadius:'25px',
                    background:'#cda8ff',
                    width:'70px',
                    height:'70px'
                   
                }}>
                    <img src={mentorImage && mentorImage !== ""?mentorImage:'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'}alt="Mentor Image" style={{
                   
                    display: 'block',     
                    width: '100%',
                    minWidth: '100%',
                    height: '100%',
                    minHeight: '100%',
                    borderWidth: '0px',
                    outline: 'none' ,
                    borderRadius:'60px',
                    objectFit:'cover'
                    // display: 'block',     
                    // width: '100%',
                    // minWidth: '100%',
                    // height: '100%',
                    // minHeight: '100%',
                    // borderWidth: '0px',
                    // outline: 'none' ,
                    // borderRadius:'10px'
            }} />
                </div>

                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    marginTop:'6px',
                    marginLeft:'10px'
                }}>
                    <div style={{
                        fontFamily:'DM Sans',
                        fontSize:'14px',
                        fontWeight:'700',
                        color:'black'
                    }}>
                        {mentorName}
                    </div>
                    <div style={{
                        fontFamily:'DM Sans',
                        fontSize:'12px',
                        color:"rgba(0, 0, 0, 0.6)"
                    }}>
                        {mentorTagline}
                    </div>
                    <div style={{
                        fontFamily:'DM Sans',
                        fontSize:'12px',
                        color:"rgba(0, 0, 0, 0.6)"
                    }}>
                        Posted {
                            Math.abs(new Date(postState.postTimestamp).getFullYear() - new Date().getFullYear()) === 0?
                            Math.abs(new Date(postState.postTimestamp).getMonth() - new Date().getMonth()) === 0 ?
                            Math.abs(new Date(postState.postTimestamp).getMinutes() - new Date().getMinutes()) === 0 ?
                            Math.abs(new Date(postState.postTimestamp).getSeconds() - new Date().getSeconds()) :
                            Math.abs(new Date(postState.postTimestamp).getMinutes() - new Date().getMinutes()) :
                            Math.abs(new Date(postState.postTimestamp).getHours() - new Date().getHours()):
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate()) === 1 ?
                            Math.abs(new Date(postState.postTimestamp).getHours() - new Date().getHours()) < 24 ?
                            Math.abs(new Date(postState.postTimestamp).getHours() - new Date().getHours()) === 0 ?
                            Math.abs(new Date(postState.postTimestamp).getMinutes() - new Date().getMinutes()) === 0 ?
                            Math.abs(new Date(postState.postTimestamp).getSeconds() - new Date().getSeconds()) :
                            Math.abs(new Date(postState.postTimestamp).getMinutes() - new Date().getMinutes()) :
                            Math.abs(new Date(postState.postTimestamp).getHours() - new Date().getHours()):
                            '1':
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate()) < 7 ?
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate()) :
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate()) < 30 ?
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate())/7 :
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate()) < 365 ?
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate())/365:
                            ''
                            
                        }{Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate()) === 0?
                            Math.abs(new Date(postState.postTimestamp).getHours() - new Date().getHours()) === 0 ?
                            Math.abs(new Date(postState.postTimestamp).getMinutes() - new Date().getMinutes()) === 0 ?
                            ' sec' :
                            ' min' :
                            ' hr':
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate()) === 1 ?
                            Math.abs(new Date(postState.postTimestamp).getHours() - new Date().getHours()) < 24 ?
                            Math.abs(new Date(postState.postTimestamp).getHours() - new Date().getHours()) === 0 ?
                            Math.abs(new Date(postState.postTimestamp).getMinutes() - new Date().getMinutes()) === 0 ?
                            ' sec' :
                            ' min' :
                            ' hr':
                            ' days' :
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate()) < 7 ?
                            ' weeks':
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate()) < 30 ?
                            ' weeks' :
                            Math.abs(new Date(postState.postTimestamp).getDate() - new Date().getDate()) < 365 ?
                            ' years':
                            ''
                            } ago
                    </div>
                </div>
                
                <div style={{
                    marginRight:'2px',
                    marginLeft:'auto',
                    cursor:'pointer'
                }}
                onClick={() => {handleClickOpen()}}
                >
                    {
                        account.role === 'mentor'?
                        <EditOutlined />
                        :
                        <BookmarkIcon/>
                    }


                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit post</DialogTitle>
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
                                value={tempPostState.postTitle}
                                onChange={(e) => {
                                    setTempPost({...tempPostState, [e.target.name]: e.target.value})
                                    console.log(tempPostState)
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
                                value={tempPostState.postBody}
                                onChange={(e) => {
                                    setTempPost({...tempPostState, [e.target.name]: e.target.value})
                                    console.log(tempPostState)
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
                    <Button onClick={()=>{updatePost(post._id)}}>Save update</Button>
                    </DialogActions>
             </Dialog>
                </div>
                <div style={{
                    fontSize:'16px',
                    fontFamily:'DM Sans',
                    fontWeight:'800',
                    borderBottom:'2px solid rgb(213 213 213)',
                    marginTop:'5px'
                }}>
                    {postState.postTitle}

                </div>

                <div style={{
                    fontSize:'14px',
                    fontFamily:'DM Sans',
                    marginTop:'5px'
                }}>
                    {postState.postBody}

                </div>
                <div style={{
                    display: 'block',
                    width: '100%',
                    height: '450px',

                }}>
                    <img src={postState.postImage && postState.postImage !== ""?postState.postImage:'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'}alt="Post Image" style={{
                    width:'100%',
                    display: 'block',     
                    width: '100%',
                    border:'1px solid rgb(213 213 213)',
                    borderRadius:'5px',
                    height: '100%',
                    outline: 'none' ,
                    
            }} />
                </div>
            </div>
        </>
    )
}

export default MentorPost
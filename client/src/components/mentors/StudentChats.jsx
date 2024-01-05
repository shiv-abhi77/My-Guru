import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams, Link, useLocation } from "react-router-dom"
import StudentSidebar from "../sidebar/StudentSidebar"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utils/util"
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client'

const StudentChats = () => {
    
    const navigate = useNavigate()
    const {account}=useContext(DataContext);
    const newMessageInitial = {
        senderRole:account.role,
        senderAccountId:account.id,
        messageType:'text',
        messageMediaLink:'',
        messageBody:'',
        messageTimestamp:new Date(),
        seenFlag:false
    }
    const {setAccount} = useContext(DataContext);
    const {chatId} = useParams()
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState(newMessageInitial)
    const [imageFile, setImageFile] = useState(null)
    const socket = io.connect('http://localhost:8000');
    socket.on('connect', () => {
        console.log('Successfully connected!');
    });
    socket.on('receive',msg=>{
        setMessages([...messages, msg]);  
    })


    const sendMessage = async() => {
        newMessage.messageTimestamp = dayjs(new Date()).$d
        const settings = {
         method: "POST",
         body: JSON.stringify({
            newMessage:newMessage
         }),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
             'authorization' : getAccessToken()
         }
         }
         try {
             console.log(settings.body)
             const fetchResponse = await fetch(`http://localhost:8000/updateChatMessages?chatId=${chatId}`, settings);
             const response = await fetchResponse.json();
            if(response.msg.includes('success')){
                
                messages.reverse()
                messages.push(newMessage)
                messages.reverse()
                setMessages(messages);
                setNewMessage(newMessageInitial)
                socket.emit('send', newMessage)
                
            }else{

            }
             
         } catch (e) {
             
             return e;
         }    
    }




    useEffect(() => {
      const myFunction = async() => {
        const url = `http://localhost:8000/getChatMessages?chatId=${chatId}`;
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
                    response.data.reverse()
                    setMessages(response.data);
                    
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
            justifyContent:'center'
          }}>
                <StudentSidebar/>
                <div style={{
                    display:'flex',
                    flexBasis:"70%",
                    flexDirection:'column',
                    height:'600px'
                    
                }}>

                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            marginBottom:'5px',
                            marginTop:'auto',
                        }}>
                
                    <div style={{
                        display:'flex',
                        flexDirection:'column-reverse',
                        maxHeight:'580px',
                        overflowY:'auto',
                        }}>

                        {
                            messages && messages.length > 0 ? messages.map(e => (
                                <>
                                    {
                                        account.role === e.senderRole ?
                                        <div style={{
                                        marginBottom:'10px',
                                        marginRight:'0px',
                                        marginLeft:'auto',
                                        borderRadius:'5px',
                                        background:'rgb(186 201 255)',
                                        maxWidth:'60%',
                                        padding:'10px',
                                        fontFamily:'DM Sans',
                                        color:'rgb(7 10 10)'
                                    }}>
                                    {e.messageBody}
                                    </div>
                                    :
                                    <div style={{
                                        marginBottom:'10px',
                                        marginRight:'auto',
                                        marginLeft:'5px',
                                        padding:'10px',
                                        borderRadius:'5px',
                                        background:'rgb(255 186 247)',
                                        maxWidth:'60%',
                                        fontFamily:'DM Sans',
                                        color:'rgb(7 10 10)'
                                    }}>
                                    {e.messageBody}
                                    </div>
                                    }
                                </>
                            ))
                            :
                            <div></div>
                        }
            </div>
            <div style={{
                display:'flex',
                flexDirection:'row',
                // marginTop:'auto',
                // marginBottom:'20px'
            }}>
                    <div style={{
                    flexBasis:'98%',
                    border:'1px solid #ebf0f5',
                    borderRadius:'5px',
                    
                }}>
                    <TextField style={{
                        width:'100%'
                    }} 
                    name="messageBody"
                    value={newMessage.messageBody}
                    onChange={(e) => {setNewMessage({...newMessage, [e.target.name]:e.target.value}); console.log(newMessage)}}
                    id="filled-multiline-flexible" 
                    variant="filled" 
                    label="Multiline"
                    multiline
                    />
                </div>
                <div style={{
                    flexBasis:'2%',
                    marginBottom:'0px',
                    marginTop:'auto',
                    background:"rgb(66 142 81)",
                    borderRadius:'5px',
                    padding:'15px',
                    color:'white',
                    height:'fit-content',
                    cursor:'pointer'
                }}
                onClick={() => {sendMessage()}}
                >
                <SendIcon/>
                </div>
            </div>
            
            
        </div>
            </div>
        </div>
        </>
    )
}
export default StudentChats
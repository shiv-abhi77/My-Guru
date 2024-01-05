import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams, Link, useLocation } from "react-router-dom"
import MentorSidebar from "../sidebar/MentorSidebar"
import { DataContext } from "../../context/DataProvider"
import { getAccessToken } from "../../utils/util"

const MentorChats = () => {
    const navigate = useNavigate()
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
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

            </div>
        </div>
        </>
    )
}
export default MentorChats
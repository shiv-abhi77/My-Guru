import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { Toolbar } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import BookmarkIcon from '@mui/icons-material/Bookmark';
const drawerWidth = 240;
export default function StudentSidebar() {
  const navigate  = useNavigate();
  const location  = useLocation();
    return(
      <div>

      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor:"#131c30",
            color:"white",
            
          }
        }}
        
        variant="permanent"
        anchor="left"
      >
      <Box display='flex' justifyContent='center' height='50px' marginTop='15px'  style= {{fontSize:'25px', cursor : 'pointer'}} onClick={() => { if(location.pathname.includes('home') === false || location.pathname === '/')  navigate('/student/home')}}>My Guru</Box>
      
        
        
      <Divider style={{backgroundColor:'#00ecff'}} />
        <List>
          {["Home","Explore", "Find Mentors", "Your Mentors", "Bookmarked"].map((text, index) => (
            <ListItem key={text} disablePadding>


            {
              index === 0 ?
              
              <ListItemButton onClick={() => { if(location.pathname.includes('/student/home') === false) navigate('/student/home')}} >
                <ListItemIcon style={{ color: '#00ecff' }} >
                   <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton> 
              :
              index === 1 ?
              <ListItemButton onClick={() => { if(location.pathname.includes('/student/explore') === false) navigate('/student/explore')}} >
                <ListItemIcon style={{ color: '#00ecff' }} >
                   <ExploreIcon/>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
              
              :
              index === 2 ?
              <ListItemButton onClick={() => { if(location.pathname.includes('/student/findmentors') === false) navigate('/student/findmentors')}} >
                <ListItemIcon style={{ color: '#00ecff' }} >
                   <FindInPageIcon/>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
              :
              index === 3 ?
              <ListItemButton onClick={() => { if(location.pathname.includes('/student/yourmentors') === false) navigate('/student/yourmentors')}} >
                <ListItemIcon style={{ color: '#00ecff' }} >
                   <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
              
              :
              index === 4 ?
              <ListItemButton onClick={() => { if(location.pathname.includes('/student/bookmarked') === false) navigate('/student/bookmarked')}} >
                <ListItemIcon style={{ color: '#00ecff' }} >
                   <BookmarkIcon/>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
              :
              <div></div>
              }
              
            </ListItem>
          ))}
        </List>
        <Divider style={{backgroundColor:'#00ecff'}} />
      </Drawer>
      </div>
    )
}
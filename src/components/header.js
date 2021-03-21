import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Content from '../components/content';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
// import Typography from '@material-ui/core/Typography';
import { deepOrange, deepPurple } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    
    title: {
      flexGrow: 1,
    },

    balance :{
        marginRight : '20px'
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
      },
  }));

  
const Navbar = ({balance,onBalanceChange,slot,setSlot,loginStatus,setLoginStatus})=>{
    
    //for login dialog
    const [open, setOpen] = React.useState(false);

    //for logout dialog
    const [openLogoutDialog,setopenLogoutDialog] = React.useState(false);

    //to get data from login form
    const[userName,setUserName] = React.useState(false);


  //opens the login dialog 
    const handleLoginClickOpen = () => {    
      setOpen(true);
    };
  
    //closes the login dialog
    const handleLoginClose = () => {
      setOpen(false);
    };

    //handle the logout functionality
    const handleLogoutButton = ()=>{
        setopenLogoutDialog(true);
    }

    //close logout dialog
    const handleLogoutClose = ()=>{
        setopenLogoutDialog(false);
    }

    //logout the user
    const logoutUser = ()=>{
      //let data = JSON.parse(localStorage.getItem("@gst"));
        setSlot([]);
        onBalanceChange(0.00);
        setLoginStatus(false);
        localStorage.removeItem("curr_login");
        setopenLogoutDialog(false);
       // alert("logout Successful");
    }

    //handle login operation
    const login = ()=>{
        if(userName == ""){
            alert("Please Provide User Name");
        }else{
            handleLoginClose();
            // console.log(userName);

            if(localStorage.getItem(userName.toLowerCase()) != null){
                //load data of that user
                let user = JSON.parse(localStorage.getItem(userName.toLowerCase()));
                setSlot(user.slot);
                onBalanceChange(user.balance);

            }else{
                //create new user
                let data = {
                    slot : [],
                    balance : 0.00
                }

                localStorage.setItem(userName.toLowerCase(),JSON.stringify(data));
                
                setSlot([]);
                onBalanceChange(0.00);
            }

            localStorage.setItem("curr_login",userName.toLowerCase());

            alert("Login Successful");
            setLoginStatus(true);
            console.log("hello world");
        }
        
    }

    const classes = useStyles();
    return (
        <div>
        <Dialog fullWidth={120} open={open} onClose={handleLoginClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>

             
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter Your Name"
              type="email"
              fullWidth
              required
              onChange={
                  (e)=>{
                      setUserName(e.target.value);
                  }
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLoginClose} color="primary">
              Cancel
            </Button>
            <Button onClick={()=>{
                login();
            }} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>

         {/* shows the logout dialog */}
         <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To Logout ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
              logoutUser();
          }} color="primary">
            Yes
          </Button>
          <Button onClick={handleLogoutClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

        <AppBar position="sticky">
            <Toolbar>
            <Typography variant="h6" className={classes.title}>
            Casino Royal
            </Typography>
            <Typography variant="h6" className = {classes.balance}>
                Balance Left : ${balance.toFixed(2)}
            </Typography>
            {
                loginStatus ? 
                <Avatar className={classes.orange}>{localStorage.getItem("curr_login")[0]}
                </Avatar> 
                :
                <Button color="inherit" onClick={()=>
                    {handleLoginClickOpen()}}>Login</Button>
            }

            {
                loginStatus ? <Button color="inherit" onClick={()=>
                    {handleLogoutButton();}}>
                    Logout
                </Button>
                : ""
            }
            
            </Toolbar>
        </AppBar>

        <br></br>
      <br></br>
      
      
            {
                loginStatus ? <Typography variant="h4" align="center" color='secondary'>
                Welcome {localStorage.getItem("curr_login")} !!
                </Typography>
                
            : <Typography variant="h4" align="center" color='primary'>
            Welcome To Casino Royal
        </Typography>
            }
            <br></br>

            {
                loginStatus ? <Typography variant="h6" align="center" color='primary'>
                Your Previous Games History
            </Typography>
            :
            <Typography variant="h6" align="center" color='primary'>
          Your Previous Games History As Guest
      </Typography>
            }
      
      <br></br>
      <Grid container>
        <Grid item xs={2}>
        
        </Grid>
        <Grid item xs={8}>
          <Content balance={balance} onBalanceChange = {onBalanceChange} slot={slot} loginStatus={loginStatus}/>
        </Grid>

        <Grid item xs={2}>
        
        </Grid>
      </Grid>
        </div>
    );
}

export default Navbar;
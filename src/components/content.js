import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';


  const useStyles = makeStyles({
    table: {
      minWidth: 400,
      padding : 40,
    },
  });
  
  function createData(id, slot1, slot2, slot3, time) {
    return { id, slot1, slot2, slot3, time };
  }

//result message
let message = "";

const Content = ({balance,onBalanceChange,slot,loginStatus})=>{

    //for game dialog
    const [open, setOpen] = React.useState(false);

    //for result dialog
    const [openResult,setOpenResult] = React.useState(false);



  //opens the game dialog 
    const handleGameClickOpen = () => {    
      setOpen(true);
    };
  
    //closes the game dialog
    const handleGameClose = () => {
      setOpen(false);
    };

    //opens the Result dialog 
    const handleResultClickOpen = () => {    
        setOpenResult(true);
      };
    
      //closes the Result dialog
      const handleResultClose = () => {
        setOpenResult(false);
        document.getElementById("img1").innerHTML = "&#63;";
        document.getElementById("img2").innerHTML = "&#63;";
        document.getElementById("img3").innerHTML = "&#63;";
      };

    //use to test that is the debug button
    const test = ()=>{
       

        // document.getElementById("img1").src = no_array[6];
        // document.getElementById("img2").src = no_array[6];
        // document.getElementById("img3").src = no_array[6];

        document.getElementById("img1").innerHTML = ""+7;
        document.getElementById("img2").innerHTML = ""+7;
        document.getElementById("img3").innerHTML = ""+7;
        //open the result dialog after 0.4 sec delay
        setTimeout(handleResultClickOpen,400);
        
        message = "Hurray !! You Got 777 !! You Won $10";
    };

    //spin and shows the obtained numbers
    const spin = ()=>{
        let v1 = Math.floor(Math.random() * 9) + 1  
        let v2 = Math.floor(Math.random() * 9) + 1  
        let v3 = Math.floor(Math.random() * 9) + 1  
        // let v1 = 7;
        // let v2 = 7;
        // let v3 = 7;
        
        
        document.getElementById("img1").innerHTML = ""+(v1);
        document.getElementById("img2").innerHTML = ""+(v2);
        document.getElementById("img3").innerHTML = ""+(v3);

        balance = balance-1.00;
        onBalanceChange(balance);
        //all the three conditions
        if(v1 != v2 && v1 != v3 && v2 != v3){
            message = "Oops !! You Got "+v1+v2+v3+" !! You didn't Won Anything";
            // console.log("const " +balance);
        }else if(v1 == 7 && v2 == 7 && v3 == 7){
            message = "Hurray !! You Got "+v1+v2+v3+" !! You Won $10";
            // onBalanceChange(balance+10.00);
            balance = balance+10.00;
            onBalanceChange(balance);
            // console.log("const " +balance);
        }else if(v1 == v2 && v2 == v3){
            message = "Hurray !! You Got "+v1+v2+v3+" !! You Won $5";
            // onBalanceChange(balance+5.00);
            balance = balance+5.00;
            onBalanceChange(balance);
            // console.log("const " +balance);
        }else if((v1 == v2 && v1 != v3) || (v1 == v3 && v1 != v2) || (v2 == v3 && v1 != v2)){
            message = "Hurray !! You Got "+v1+v2+v3+" !! You Won $0.5";
            // onBalanceChange(balance+0.50);
            balance = balance+0.50;
            onBalanceChange(balance);
            // console.log("const " +balance);
        }else{
            message = "Oops !! You Got "+v1+v2+v3+" !! You didn't Won Anything";
        }
        
        //push object to slot
        if(slot.length == 0){
            slot.push({id: 1,slot1 : v1,slot2 : v2,slot3 : v3,time : ""+new Date()});
        }else{
            slot.push({id: slot[slot.length-1].id+1,slot1 : v1,slot2 : v2,slot3 : v3,time : ""+new Date()});
        }

        //if user is logged in then update the data 
        if(localStorage.getItem("curr_login") != null){
            let userName = localStorage.getItem("curr_login");
            let data = JSON.parse(localStorage.getItem(userName));
            data.slot = slot;
            data.balance = balance;
            
            //save changes
            localStorage.setItem(userName,JSON.stringify(data));
         }//else{
        //   //update the guest data
        //   let data = JSON.parse(localStorage.getItem("@gst"));
        //     data.slot = slot;
        //     data.balance = balance;
        //     // console.log(data);
        //     // console.log(balance);
        //     //save changes
        //     localStorage.setItem("@gst",JSON.stringify(data));
        // }
        setTimeout(handleResultClickOpen,400);
    }


    const classes = useStyles();
    return (
    <div>
        <Dialog open={open} onClose={handleGameClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Play Game</DialogTitle>
          <DialogContent>


          <Dialog
        open={openResult}
        onClose={handleResultClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Result</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResultClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>








            {/* shows the three slots */}

            <Grid container>
                <Grid item xs={4} style={{border:'0.5px solid black',color:'orange',fontSize : '30px'}}>
                  <h1 align="center" id="img1" color="white">&#63;</h1>
                    {/* <img src="../images/ques-mark.png" width="100%" id="img1"></img> */}
                </Grid>

                <Grid item xs={4} style={{border:'0.5px solid black',color:'blue',fontSize : '30px'}}>
                  <h1 align="center" id="img2">&#63;</h1>
                    {/* <img src="../images/ques-mark.png" width="100%" id="img2"></img> */}
                </Grid>

                <Grid item xs={4} style={{border:'0.5px solid black',color:'green',fontSize : '30px'}}>
                  <h1 align="center" id="img3">&#63;</h1>
                    {/* <img src="../images/ques-mark.png" width="100%" id="img3"></img> */}
                </Grid>


            </Grid>

        <br></br>
        <br></br>
         {/* shows the all three button      */}
          <Grid container spacing={3}>
          {/* <Grid item xs={1}></Grid> */}
      <Grid item xs={3}>
        
        <Button variant="contained" color="primary" onClick={()=>{
            spin();
        }}>
        Spin
        </Button>
        
      </Grid>

        <Grid item xs={1}></Grid>
      <Grid item xs={3}>
       
        <Button variant="contained" color="secondary" onClick={()=>{
            test();
        }}>
        Debug
        </Button>
        
      </Grid>

      <Grid item xs={1}></Grid>

      <Grid item xs={3}>
        
        <Button variant="contained" onClick={()=>{handleGameClose()}}>
        Close
        </Button>
       
      </Grid>

     

      </Grid>
          
      <br></br>
          </DialogContent>
        </Dialog>

        {/* shows the player game table */}
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Slot-1</TableCell>
              <TableCell align="right">Slot-2</TableCell>
              <TableCell align="right">Slot-3</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slot.length > 0 ? 
            slot.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.slot1}</TableCell>
                <TableCell align="right">{row.slot2}</TableCell>
                <TableCell align="right">{row.slot3}</TableCell>
                <TableCell align="right">{row.time.substring(0,row.time.length-30)}</TableCell>
              </TableRow>
            )):"No Data Available"}
          </TableBody>
        </Table>
      </TableContainer>
      <Container align="center">
          <br></br>
          <br></br>

        {/* opens the game dialog */}
        {
            loginStatus == false ? (<Button variant="contained" color="primary" onClick={()=>
                {
                    handleGameClickOpen();
                }
            }>Play As A Guest</Button>)
            : (<Button variant="contained" color="primary" onClick={()=>
                {
                    handleGameClickOpen();
                }
            }>Play</Button>)
        }
      
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </Container>
    </div>
    );
}

export default Content;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root :{
    textAlign : 'center',
    background : 'linear-gradient(45deg,#FE6888 30%,#FF8E53 90%)',
    boxShadow : '0 3px 5px 2px rgba(266,105,135, .3)',
    color : 'white',
    height : 80,
    fontSize : '18px',
    fontWeight : 'bond',
    //padding : '5px 30px',
    position : 'fixed',
    bottom : 0,
    
    width : '100%',
  }
}));

const Footer = ()=>{
  const classes = useStyles();
   return (
  //   <AppBar position="fixed" color="secondary" className={classes.root}>
  //   <Container maxWidth="md">
  //     <Toolbar>
  //       <Typography variant="h6" color="inherit" className = {classes.copyRight}>
  //         © Casino Royal 2021 All Rights Reserved
  //       </Typography>
  //     </Toolbar>
  //   </Container>
  // </AppBar>

    <div className={classes.root}>
      {/* <hr /> */}
      <h4>© Casino Royal 2021 <br/>All Rights Reserved</h4>
    </div>
   );
}

export default Footer;
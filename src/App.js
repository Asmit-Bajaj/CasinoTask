import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import NavBar from './components/header';
import React from 'react';
import Footer from './components/footer'


function App() {
  let user = null;
  let gstData = {
    slot : [],
    balance : 0.00,
  };

  if(localStorage.getItem("curr_login") != null){
    //load data of login user
    let userName = localStorage.getItem("curr_login");
    console.log(localStorage.getItem(userName));
    user = JSON.parse(localStorage.getItem(userName));
   }//else{
  //   //load data of guest user
  //   if(localStorage.getItem("@gst") == null){
  //     gstData = {
  //       slot : [],
  //       balance : 0.00
  //     }  
  //     localStorage.setItem("@gst",JSON.stringify(gstData));
  //   }else{
  //     gstData = JSON.parse(localStorage.getItem("@gst"));
  //   }
  // }

    const[balance,setBalance] = React.useState(
      user != null ? user.balance : gstData.balance);

    const [slot,setSlot] = React.useState(
      user != null ? user.slot : gstData.slot
    );

    //login status
    const [loginStatus,setLoginStatus] = React.useState(
      user != null ? true : false
    );

    //if user is logged In
    

  return (
    <div>
      <NavBar balance={balance} onBalanceChange={setBalance} slot={slot} setSlot = {setSlot} 
      loginStatus = {loginStatus} setLoginStatus = {setLoginStatus}/>
      <Footer />
    </div>
  );
}

export default App;

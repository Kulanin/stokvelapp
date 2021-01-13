import React, { Component } from "react"
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import StokvelForm from "./components/Form"
import Table from 'react-bootstrap/Table'
import { createBrowserHistory } from 'history';
const { Form,  } = require("react-bootstrap");





//------------------------------------------------------------------------
//Header List #Login Register myAccount
//------------------------------------------------------------------------




function HeaderList(props) {

  console.log(props.ToggleModalState);

  return (

    <div className="classHeaderList">
      <ul>
        {<li ><a href="#" ref={props.headerRef} onClick={() => props.ToggleModalState(props, "logout")}>
        </a>{localStorage.getItem("mySessionDataStorageFirstname")}</li>}
        <li ><a style={{ "color": localStorage.getItem("mySessionDataStorageFirstname") ? "red" : "" }}
          href="#" onClick={() => {
            !localStorage.getItem("mySessionDataStorageFirstname") ?
            props.ToggleModalState(props, "login") : props.ToggleModalState(props, "logout")
          }} >
          {!localStorage.getItem("mySessionDataStorageFirstname") ? "Login" : "Logout"}
        </a>
        </li>
        <li style={{ "display": localStorage.getItem("mySessionDataStorageFirstname") ? "none" : "block" }} ><a href="#" onClick={() => props.ToggleModalState(props, "register")} >{props.m_LoginStatus ? "" : "Register"}</a></li>
        <li ><a href="#" onClick={() => props.ToggleModalState(props, "Myaccount")} >{localStorage.getItem("mySessionDataStorageFirstname") ? "My Account" : ""}</a></li>
       {/*  <li ><a href="#" onClick={() => props.ToggleModalState(props, "UploadImaged")} >Upload Imaged</a></li>*/}
      </ul>
    </div>
  )
}

//------------------------------------------------------------------------
//History Component
//------------------------------------------------------------------------

//------------------------------------------------------------------------
//Personal Details Component
//------------------------------------------------------------------------
function PersonalDetails(props) {

  const members = props.members;
  let g_Firstname = "";
  let g_Surname = "";

  members.map((value, index) => {

    if(value._id === localStorage.getItem("mySessionDataStorageId")){

      g_Firstname = value.firstname;
      g_Surname = value.lastname;
    }
  })  

  return (

   
    <div className="classPersonalDetails" style={{"display":props.m_Myaccount}} >

<h1>Personal Details</h1> 
      <div style={{ "background": "#eceff5", "display": "grid", "gridTemplateColumns": "auto auto", "marginTop":20 }}>

        <div style={{ "justifySelf": "start", "margin": "20px 20px 20px", }}>
          <h3>Your name</h3>
          <p style={{ "fontSize": 22 }}>{g_Firstname}</p>
        </div>
        <Button style={{ "width": 200, "height": 50, "margin": "40px 20px 20px", "justifySelf": "end" }} onClick={()=>props.ToggleModalState(props,"UpdateName")} >Edit</Button>
      </div>

      <div style={{ "background": "#eceff5", "display": "grid", "gridTemplateColumns": "auto auto", "marginTop":20 }}>

        <div style={{ "justifySelf": "start", "margin": "20px 20px 20px", }}>
          <h3>Surname</h3>
          <p style={{ "fontSize": 22 }}>{g_Surname}</p>
        </div>
        <Button style={{ "width": 200, "height": 50, "margin": "40px 20px 20px", "justifySelf": "end" }}>Edit</Button>
      </div>
      

      <div style={{ "background": "#eceff5", "display": "grid", "gridTemplateColumns": "auto auto", "marginTop":20 }}>

<div style={{ "justifySelf": "start", "margin": "20px 20px 20px", }}>
  <h3>Upload Image</h3>
  {/*<p style={{ "fontSize": 22 }}>Ngobeni</p>*/}
</div>
<Button style={{ "width": 200, "height": 50, "margin": "40px 20px 20px", "justifySelf": "end" }}  onClick={()=>props.ToggleModalState(props,"UploadImaged")} >Edit</Button>
</div>




      <div style={{ "background": "#eceff5", "display": "grid", "gridTemplateColumns": "auto auto", "marginTop":20}}>

        <div style={{ "justifySelf": "start", "margin": "20px 20px 20px", }}>
          <h3>Password</h3>
          <p style={{ "fontSize": 22 }}>********</p>
        </div>
        <Button style={{ "width": 200, "height": 50, "margin": "40px 20px 20px", "justifySelf": "end" }}>Edit</Button>
      </div>

      <Button style={{ "display": props.displayTable, "marginTop":20 }} onClick={() => props.ToggleModalState(props, "Back")}>Go Back</Button>
    {/**  <div style={{ "background": "#eceff5", "display": "grid", "gridTemplateColumns": "auto auto", }}>

        <div style={{ "justifySelf": "start", "margin": "20px 20px 20px", }}>
          <h3>Email</h3>
          <p style={{ "fontSize": 22, }}>kulani29@yahoo.com</p>
        </div>
        <Button style={{ "width": 200, "height": 50, "margin": "40px 20px 20px", "justifySelf": "end" }}>Edit</Button>
      </div>
*/} 
    </div>


  )
}


function PfuxananiHistory() {

  return (
    <div className="classPfuxanaiHistory">
      <p>The history of Pfuxanani magaza will go here. SG will have a responisibity to write for us</p>

    </div>
  )
}

//------------------------------------------------------------------------
//Footer
//------------------------------------------------------------------------

function Footer() {

  return (
    <footer className="classFooter">

    </footer>
  )
}

//------------------------------------------------------------------------
//Form Modal for stokvel members
//------------------------------------------------------------------------

function FormModal(props) {

  return (
    <div>
      <Modal className="c_FormModal" isOpen={props.ModalState} >

        <StokvelForm dataset={props.dataset}
          classRegisterForm={props.classRegisterForm}
          classPaymentForm={props.classPaymentForm}
          classLogin={props.classLogin}
          uniqueMemberid={props.uniqueMemberid}
          buttonText={props.buttonText}
          ModalState={props.ModalState}
          headerRef={props.headerRef}
          ToggleModalState={props.ToggleModalState}
          m_LoginStatus={props.m_LoginStatus}
          m_UploadImage={props.m_UploadImage}
          


        />

      </Modal>
    </div>
  )
}

function PaymentTable(props) {

  let rows = props.EachMember;
  let Total = 0;
  let length = "";

  if (rows) {

    console.log("Length " + rows.amount.length);
    length = rows.amount.length;

    for (let i = 0; i < length; i++) {

      console.log("Total " + rows.amount[i]);
      Total += rows.amount[i];
    }

  }

  let columns = ["Fistname", "Lastname", "#", "Date", "Amount"];

  return (

    <div className="PaymentHistory">


      <div>
        <Table striped bordered hover style={{ "display": props.displayTable, "width": "100%" }}>


          <thead>
            <tr >{columns.map((column, index) => {
              return <th>{column}</th>
            })}
            </tr>

          </thead>
          <tbody>
            <tr>

              <td>{props.EachMember.firstname}</td>
              <td>{props.EachMember.lastname}</td>

              <td>{rows.amount && rows.amount.map((value, index) => {

                return <div>{index}</div>

              })}

              </td>
              <td>{rows.date && rows.date.map((date, index) => {
                return <div>{date} </div>
              })}
              </td>

              <td style={{}}>{rows.amount && rows.amount.map((amount, index) => {
                return <div>{`R  ${amount}`}</div>
              })}

              </td>
            </tr>
            <tr>
              <th colSpan="4" style={{ "textAlign": "right" }}>Total</th>
              <td style={{ "fontWeight": "bold" }}>{`R  ${Total}.00`}</td>
            </tr>

          </tbody>
        </Table>




      </div>

      <Button style={{ "display": props.displayTable, }} onClick={() => props.ToggleModalState(props, "Back")}>Go Back</Button>
    </div>
  )

}

//------------------------------------------------------------------------
//Compoment which displays each member information 
//------------------------------------------------------------------------
function Members(props) {

  const members = props.members;




  return (

    <div className="c_members">

      {
        members.map((value, index) => {

          let sum = 0;
          for (let i = 0; i < value.amount.length; i++) {

            sum += value.amount[i];
          }

          console.log("id: " + value._id);
          console.log("Session name" + localStorage.getItem("mySessionDataStorageFirstname"));
          return <Card className="c_membersContainer" style={{ "width": "20rem", "maxWidth": "18rem", "cursor":  localStorage.getItem("mySessionDataStorageId") === value._id ? "pointer" :""}}  >
            <Card.Img variant="top" style={{"height": "20rem"}}
              src={`http://localhost:5001/${value._id}.jpg`}
              onClick={localStorage.getItem("mySessionDataStorageId") === value._id ? () => props.ToggleMemberTable(props, value) : ""}

            ></Card.Img>
            <Card.Body>
              <Card.Title>{value.firstname} {value.lastname}</Card.Title>
              {/*<Card.Text id={index} >Cell : {value.cell}</Card.Text> */}
              <Card.Text id={index}>Total Contribution : {localStorage.getItem("mySessionDataStorageId") === value._id ? `R ${sum} .00`  : ""}</Card.Text>
            </Card.Body>
            <Button disabled={localStorage.getItem("mySessionDataStorageId") === value._id ? props.ModalState : props.m_DisablePaymentBtn} variant="primary" onClick={() => props.ToggleModalState(props, value._id)}>Add Amount</Button>
          </Card >

        })

      }

    </div >
  )


}

//------------------------------------------------------------------------
//Loader Component
//------------------------------------------------------------------------

function CSSLoader(props) {

  return (
    <div className={props.displayLoader}></div>
  )
}

function Test() {
  console.log("testing");
}

//let users = ["Phindile", "Kulani", "Lulama"];
let g_MemberList = [];
let g_IntervalId = "";


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
class App extends React.Component {

  constructor(props) {

    super(props);

    this.headerRef = React.createRef();

    this.state = {
      display: false,
      name: "Kulani",
      ModalState: false,
      classPaymentForm: "none",
      classRegisterForm: "none",
      classLogin: "none",
      buttonText: "",
      uniqueMemberid: "",
      displayTable: "none",
      EachMember: "",
      displayMembersDiv: "block",
      displayLoader: "classLoader",
      FetchError: "",
      m_count: 0,
      m_LoginStatus: "",
      m_DisablePaymentBtn: true,
      m_Myaccount: "none",
      m_UploadImage: "none",


      dataset: g_MemberList
    }

  }
  //-----------------------------------------------------------------------
  //-----------------------------------------------------------------------
  async FetchDataFromTheBackEnd() {

    let url = "";

    if (process.env.NODE_ENV === 'production') {

      url = "http://127.0.0.1:" +  process.env.PORT ;
    }else{

       url =  "http://127.0.0.1:" + 5001;// || 5001; 

    }

   

    let memberObject = {};
    memberObject.name = "Kulani";

    let requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },

    };

    try {

      let data = await fetch(url, requestOptions);
      let response = await data.json();


      if (response) {

        this.setState({
          displayLoader: ""
        })

        response.data.map((data, index) => {
          console.log(data);
          this.MemberListArray(data);
        })

      }

    }
    catch (p_Reject) {

      console.log("There was error when fetching data" + p_Reject);
    }

  }

  //-----------------------------------------------------------------------
  //-----------------------------------------------------------------------
  componentDidMount = () => {


    console.log("Kulani Component did mount");
    this.FetchDataFromTheBackEnd();
    if (this.state.dataset.length === 0) {

      g_IntervalId = this.SetTimeInterval(this.TimerConter, 1000);
      console.log("g_Intervalid 000 " + g_IntervalId);
    }


  }

  //-----------------------------------------------------------------------
  //-----------------------------------------------------------------------
  ToggleModalState = (props, p_Value = "") => {




    if (p_Value.message === "You have successfully logged in") {

      console.log("Kulani" + p_Value.firstname);

      this.setState({

        m_LoginStatus: "Hi " + p_Value.firstname,
      })



      return;
    }

    switch (p_Value) {

      case "Cancel":
        this.setState({
          ModalState: !this.state.ModalState,
          classRegisterForm: "none",
          classPaymentForm: "none",
          classLogin: "none",
          m_Myaccount: "none",
          m_UploadImage: "none",
          displayMembersDiv: "block",
          
        })

        // window.location.reload(false);
        this.headerRef.current.focus();

        break;

      case "Back":
        this.setState({
          displayMembersDiv: "block",
          displayTable: "none",
          classPaymentForm: "none",
          m_Myaccount: "none",
          m_UploadImage: "none",
        })

        // window.location.reload(false);
        this.headerRef.current.focus();

        break;

      case "register":
        this.setState({
          ModalState: !this.state.ModalState,
          classRegisterForm: "block",
          classPaymentForm: "none",
          buttonText: "Register Now",
          displayTable: "none",
          m_Myaccount: "none",
          m_UploadImage: "none"

        });
        break;

        case "Myaccount":
          this.setState({
            displayMembersDiv: "none",
            classRegisterForm: "none",
            classPaymentForm: "none",
            displayTable: "none",
            m_Myaccount: "block"
  
          });
          break;

          case "UploadImaged":
            this.setState({
              ModalState: !this.state.ModalState,
              m_UploadImage: "block",
               displayMembersDiv: "block",
              buttonText: "Upload Image",
              classRegisterForm: "none",
              classPaymentForm: "none",
              displayTable: "none",
              m_Myaccount: "none",
            
            });
            
            break;

      case "login":
        this.setState({
          ModalState: !this.state.ModalState,
          classLogin: "block",
          buttonText: "Login",
          displayTable: "none",
          m_Myaccount: "none",
          m_UploadImage: "none",

        });
        break;


      case "logout":
        localStorage.removeItem("mySessionDataStorageFirstname");
        localStorage.removeItem("mySessionDataStorageId");
        this.setState({
          ModalState: this.state.ModalState,
          displayMembersDiv: "block",
          m_Myaccount: "none",

        });
        break;

        case "UpdateName":
          this.setState({
            ModalState: this.state.ModalState,
            displayMembersDiv: "block",
            buttonText: "Update",
            m_Myaccount: "none",
            classRegisterForm: "none",
            classPaymentForm: "none",
            displayTable: "none",
          
  
          });
          break;



      default:

        this.setState({
          ModalState: true,
          classPaymentForm: "block",
          uniqueMemberid: p_Value,
          buttonText: "Payment",
          displayTable: "none",
          m_Myaccount: "none"
          
        });
        break;

    }


    // if(p_Value === "Cancel"){


    //   this.setState({
    //     ModalState: !this.state.ModalState,
    //   })
    //   window.location.reload(false);
    //   this.headerRef.current.focus();

    //   return;
    // }

    // console.log("Kulani ToggleState passed value : " + p_Value);
    // if (p_Value == "register") {

    //   this.setState({
    //     ModalState: !this.state.ModalState,
    //     classRegisterForm: "block",
    //     classPaymentForm: "none",
    //     buttonText: "Register Now",
    //     displayTable: "none"

    //   });

    //   return;
    // }

    // this.setState({
    //   ModalState: true,
    //   classPaymentForm: "block",
    //   uniqueMemberid: p_Value,
    //   buttonText: "Submit",
    //   displayTable: "none"
    // });

  }
  //-----------------------------------------------------------------------
  //-----------------------------------------------------------------------
  ToggleMemberTable = (props, p_Member) => {

    this.headerRef.current.focus();

    this.setState({

      displayTable: !this.state.displayTable,
      EachMember: p_Member,
      displayMembersDiv: "none",
      displayLoader: "none"

    });


  }

  //-----------------------------------------------------------------------
  //-----------------------------------------------------------------------
  MemberListArray(p_MemberList) {

    g_MemberList.push(p_MemberList);

    this.setState({

      dataset: g_MemberList
    })

    console.log(this.state.dataset)

  }

  //-----------------------------------------------------------------------
  //-----------------------------------------------------------------------
  ToggleTable() {

    this.setState({
      displayTable: "block",
    })

  }


  //------------------------------------------------------------------------
  //SetTimeout function 
  //------------------------------------------------------------------------
  SetTimeout(p_Function, p_Milliseconds) {

    setTimeout(p_Function, p_Milliseconds);
  }
  //------------------------------------------------------------------------
  //SetInterval function 
  //------------------------------------------------------------------------
  SetTimeInterval(p_Function, p_Milliseconds) {

    return setInterval(p_Function, p_Milliseconds);
  }

  //------------------------------------------------------------------------
  //ClearInterval function 
  //------------------------------------------------------------------------
  ClearInterval(p_Function) {

    clearInterval(p_Function);
  }

  TimerConter = () => {

    console.log(this.state.m_count++);

    const { m_count, dataset, FetchError } = this.state;
    //if dataset length is empty we try every second to fetch the data again. 
    //If there is data from the back-end we clear the interval immediately
    if (dataset.length === 0 && m_count <= 10) {

      this.FetchDataFromTheBackEnd();

    } else {

      this.ClearInterval(g_IntervalId);
    }

    //After waiting for 10 seconds we stop trying and display connection error. 
    if (m_count > 10 && dataset.length === 0 && FetchError === "") {

      this.ClearInterval(g_IntervalId);

      this.setState(
        {
          displayLoader: "",
          FecthError: "Opss something went wrong!!!"
        })

      //this.FetchDataFromTheBackEnd();
      return;

    }


  }


  render() {




    return (
      <div className="App">
        <header className="App-header" ToggleModalState={this.ToggleModalState} >

          <HeaderList
            ToggleModalState={this.ToggleModalState}
            headerRef={this.headerRef}
            m_LoginStatus={this.state.m_LoginStatus} />

          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Pfuxanani Magaza Stokvel to be released soon
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >

          </a>
        </header>


        < CSSLoader displayLoader={this.state.displayLoader} />
        <PersonalDetails

          EachMember={this.state.EachMember}
          ToggleModalState={this.ToggleModalState}
          m_Myaccount={this.state.m_Myaccount}
          members={this.state.dataset}
          
        />
        <h1>{this.state.FecthError}</h1>

        <div style={{ "display": this.state.displayMembersDiv }}  >
          <Members members={this.state.dataset}
            ToggleModalState={this.ToggleModalState}
            ToggleMemberTable={this.ToggleMemberTable}
            m_DisablePaymentBtn={this.state.m_DisablePaymentBtn}


          />
        </div>

        <FormModal ModalState={this.state.ModalState}
          dataset={this.state.dataset}
          classRegisterForm={this.state.classRegisterForm}
          classPaymentForm={this.state.classPaymentForm}
          classLogin={this.state.classLogin}
          uniqueMemberid={this.state.uniqueMemberid}
          buttonText={this.state.buttonText}
          headerRef={this.headerRef}
          ToggleModalState={this.ToggleModalState}
          m_LoginStatus={this.state.m_LoginStatus}
          m_Myaccount={this.state.m_Myaccount}
          m_UploadImage={this.state.m_UploadImage}
          
          


        />

        <PaymentTable displayTable={this.state.displayTable}

          EachMember={this.state.EachMember}
          ToggleModalState={this.ToggleModalState}

        />


        <PfuxananiHistory />

        <Footer />
      </div>

    );
  }

}

export default App;


import Axios from 'axios';
import React from 'react';
import Alert from 'react-bootstrap/Alert'
import './Form.css'
const { Form, Button } = require("react-bootstrap");

//let g_fileName = "";

/*
//------------------------------------------------------------------------
//Profile image send component
//------------------------------------------------------------------------
async function sendProfileImage(){

    let formData = new FormData();
    let image = document.getElementById("KulaniImage"); 
    //formData.append("profileImage","C:\Users\Kulanin\Pictures\Saved Pictures");
    formData.append("file",image.files[0]);
    let url = "http://127.0.0.1:5001/profileImage";
     //headers: { "Content-Type": "application/json" },
    let requestOptions = {
      method: "POST",
      body: formData,
      
    };

    console.log(image.files[0]);
    let data  =  await fetch(url,requestOptions);
  
  
    let Response = await data.json();
  }
  
  function TestForm(props){
  
    return(
  
    <div>
    <form controlId="basicForm" 
    style={{ "margin": "auto","backgroundColor":"white", "border":"solid black 1px",
    "height":"300px","width":"50%", "display":props.m_UploadImage}}
 >
         <h3 >Upload Image</h3> <br/>
          <input  type="file" id="KulaniImage"  placeholder="profileImage" />
          <button onClick={sendProfileImage} value="Upload">Upload</button>
          </form>
  
    </div>
  
  )
  }
*/
class StokvelForm extends React.Component {

    constructor(props) {

        super(props);

        this.lastnameRef = React.createRef();
        this.firstnameRef = React.createRef();
        this.date = React.createRef();
        this.amount = React.createRef();
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordRef1 = React.createRef();
        this.passwordRef2 = React.createRef();
        this.profileImage = React.createRef();

        this.state = {

            firstname: "",
            lastname: "",
            memberid: "",
            date: "",
            amount: "",
            cell: "",
            password1: "",
            password2: "",
            parssword:"",
            username: "",
            m_UploadImage:"",
            //below usued to manipulate form control background colors
            FirstnameBorderColor: "",
            LastnameBorderColor: "",
            DateBorderColor: "",
            AmountBorderColor: "",
            MemberIdBorderColor: "",
            //End of styled background colors
            SuccessPaymentMessage: "",
            ErrorPaymentMessage: "",
            m_disableSubmitBtn: false,


        }


        this.MemberRegistration = this.MemberRegistration.bind(this);
    }

    ValidateInputValues(p_InputValueObject) {

        if (this.props.buttonText === "Register Now") {

            if (p_InputValueObject.firstname === "") {

                console.log("Firstname cannot be empty")
               this.firstnameRef.current.focus();
                this.setState({
                    ErrorPaymentMessage: "Firstname cannot be empty! ",
                    FirstnameBorderColor: "red"
                   
                })

               

                return false;
            } else if (p_InputValueObject.lastname === "") {

                console.log("Lastname cannot be empty")
                this.lastnameRef.current.focus();
                this.setState({
                    ErrorPaymentMessage: "Lastname cannot be empty! ",
                    LastnameBorderColor:"red"
                })

                return false;
            }
        }


        if (this.props.buttonText === "Payment") {

            if (p_InputValueObject.date === "") {

                console.log("Date cannot be empty");
                this.date.current.focus();
                this.setState({
                    ErrorPaymentMessage: "Date cannot be empty! ",
                    DateBorderColor:"red"
                    
                })

                return false;

            }else if (p_InputValueObject.amount === "") {

                console.log("Amount cannot be empty");
                this.amount.current.focus();
                this.setState({
                    ErrorPaymentMessage: "Amount cannot be empty! ",
                    AmountBorderColor:"red",
                })

                return false;

            }
        }

        if(p_InputValueObject.password1 != p_InputValueObject.password2){

            this.passwordRef1.current.focus();
            this.setState({
                ErrorPaymentMessage: "Password entered do not match!",
              
            })

            return false;

        }


        if(isNaN(p_InputValueObject.amount)){

            this.passwordRef1.current.focus();
            this.setState({
                ErrorPaymentMessage: "Amount can only contain numerics",
              
            })

            return false;

        }

         if (this.props.buttonText === "Login") {


            
            if (p_InputValueObject.username === "") {

                console.log("Username  cannot be empty");
                this.date.current.focus();
                this.setState({
                    ErrorPaymentMessage: "Username cannot be empty! ",
                   
                    
                })

                return;

            }

            if (p_InputValueObject.password === undefined || p_InputValueObject.password === "") {

                console.log("Password cannot be empty");
                this.date.current.focus();
                this.setState({
                    ErrorPaymentMessage: "Password cannot be empty! ",
                   
                    
                })

                return;

            }


        }


        this.setState({
            ErrorPaymentMessage: ""
        })


        return true;

    }

    //------------------------------------------------------------------
    //Define an aleart function 
    //------------------------------------------------------------------

    AlertMessage(p_Message, p_Variant, p_Show = false) {

        return (

            <Alert variant={p_Variant}
             style={{ "height": 45, "marginTop": -20, "transition-timming-function":"linear","transitionDelay":"0.7"}} show={p_Show}>
                <p style={{ "textAlign": "center" }}>
                    {p_Message}
                </p>

            </Alert>

        )


    }

    async MemberRegistration(e,props) {
      
        

        let memberObject = {};
        let url = "";


        //console.log("Image" + this.state.m_UploadImage);
        //console.log("username" + this.state.username);

        //memberObject.memberid = this.state.memberid;
        memberObject.memberid = this.props.uniqueMemberid;
        memberObject.firstname = this.state.firstname;
        memberObject.lastname = this.state.lastname;
        memberObject.cell = this.state.cell;
        memberObject.date = this.state.date;
        memberObject.amount = this.state.amount;
        memberObject.password1 = this.state.password1;
        memberObject.password2 = this.state.password2;
        memberObject.username = this.state.username;
        memberObject.password = this.state.password;
       // memberObject.profileImage = this.state.m_UploadImage;

       

        if(memberObject.username === ""){

            memberObject.username = localStorage.getItem("username")
        }

        if( memberObject.password === undefined){

            memberObject.password = localStorage.getItem("password")
        }

        if (this.ValidateInputValues(memberObject)) {

            let urlRegister = "http://127.0.0.1:5001/insert";
            let urlPayment = "http://127.0.0.1:5001/Payment";
            let urlLogin = "http://127.0.0.1:5001/members/login";

            url = this.props.uniqueMemberid ? urlPayment : this.props.buttonText === "Login" && memberObject.username && memberObject.password  ? urlLogin : urlRegister;

            let formData = new FormData();
            let file = document.getElementById("KulaniImage2");
           
            let fileObject = file.files[0];

           // fileObject.originalname = localStorage.getItem("mySessionDataStorageId");
          
        
            formData.append("file",fileObject);  
            formData.append("_id",localStorage.getItem("mySessionDataStorageId"))
            //formData.set("id", localStorage.getItem("mySessionDataStorageId"));

        

            console.log(this.props.m_UploadImage)
            
            let requestOptions = {
                method: "POST",
                headers: !this.props.m_UploadImage === "block"  ? "" : { "Content-Type": "application/json" },
                body: this.props.m_UploadImage  === "block" ? formData : JSON.stringify({member: memberObject}),
                 
             
            };

          
            


            try {

                if(this.props.m_UploadImage  === "block"){

                    delete requestOptions.headers;
                    url = "http://127.0.0.1:5001/profileImage";
                    
                    
                   
    
                } 

                //let data  =  Axios.post(url,formData)

                let data = await fetch(url, requestOptions);
              
                let Response = await data.json();

                console.log(Response.data);

                if (Response.data) {

                    if (Response.data.message === "You have successfully logged in") {

                        this.props.ToggleModalState(props,Response.data);
                        localStorage.setItem("username",memberObject.username );
                        localStorage.setItem("password", memberObject.password);
                    }
                    
                    this.setState({

                        SuccessPaymentMessage: Response.data.message ? Response.data.message : Response.data,
                        ErrorPaymentMessage: "",
                        m_disableSubmitBtn: true,
                    })

         
                    setTimeout(() => {

                        window.location.reload(false);
                        
                    }, 1500);
         
                    //sessionStorage.setItem("mySessionDataStorage","Hi " + Response.data.data.firstname + ` (that's not me)`)
                    if (Response.data.message != "Member Image successfully uploaded"){
                        localStorage.setItem("mySessionDataStorageFirstname",Response.data.data.firstname);
                        localStorage.setItem("mySessionDataStorageId",Response.data.data._id);

                    }
                    
                  
                    return;
                }
                else if (Response.error) {
                    this.setState({

                        ErrorPaymentMessage: Response.error,
                        SuccessPaymentMessage: ""
                    })

                    setTimeout(() => {

                        window.location.reload(false);
                        
                    }, 1500);

                    return;
                }else if(Response.error === undefined){

                    this.setState({

                        ErrorPaymentMessage: "File was not renamed properly",
                        SuccessPaymentMessage: ""
                    })
                }

            }
            catch (p_Error) {

                console.log("there was error " + p_Error)
            }


        }

        return false;
    }

    handleChange = (event) => {

        console.log(event.target.name);
        console.log(event.target.value)

        const name = event.target.name;
        const value = event.target.value;
        if(name ==="username"){
            localStorage.removeItem("username") 
        }

        if(name ==="password"){
            localStorage.removeItem("password") 
        }

        // if(name ==="m_UploadImage"){
            
        //     const value = event.target.files;
        //     //g_fileName = value;
        //     this.setState({
        //         m_UploadImage: value,
        //     })
        // }


      

        this.setState({ [name]: value,
        
            FirstnameBorderColor:"",
            LastnameBorderColor:"",
            AmountBorderColor:"",
            DateBorderColor:"",
            ErrorPaymentMessage: ""
        })

    }

 



    render() {

        console.log("Kulani upload form", this.props.m_UploadImage)

        const classPaymentForm = {

            "display": this.props.dataset ? this.props.classPaymentForm : "block",
            "marginTop": 10,

        }

        const classRegisterForm = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10

        }

        //-----------------------------------------------------------------------
        const ClassFirstname = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10,

        }


            //-----------------------------------------------------------------------
            const classLogin = {

                "display": this.props.dataset ? this.props.classLogin : "block",
                "marginTop": 10,
    
            }
         //-----------------------------------------------------------------------
         const styleFirstname = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10,
            "borderColor":this.state.FirstnameBorderColor

        }


        const styleLastname = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10,
            "borderColor":this.state.LastnameBorderColor
            

        }

        const styleCell = {

            "display": this.props.dataset ? this.props.classRegisterForm : "block",
            "marginTop": 10

        }

        const styleDate = {

            "display": this.props.dataset ? this.props.classPaymentForm : "block",
            "marginTop": 10,
            "borderColor":this.state.DateBorderColor

        }

        const styleAmount = {

            "display": this.props.dataset ? this.props.classPaymentForm : "block",
            "marginTop": 10,
            "borderColor":this.state.AmountBorderColor
            

        }

        const styleMemberId = {

            "display": this.props.dataset ? this.props.classPaymentForm : "block",
            "marginTop": 10

        }

        const styleUploadForm = {

            "display": this.props.m_UploadImage,
        
        }

        

  

        console.log("KulanUniqueID" + this.props.uniqueMemberid)
        
        console.log("buttonText" + this.props.buttonText)

        return (


            <Form className="classForm"   >
            
        <h2 style={{"textAlign":"center"}}>{this.state.ErrorPaymentMessage || this.state.SuccessPaymentMessage ? "": this.props.buttonText}</h2>
              <div>{this.AlertMessage(this.state.ErrorPaymentMessage ? this.state.ErrorPaymentMessage : this.state.SuccessPaymentMessage, this.state.ErrorPaymentMessage ? "danger" : "success", this.state.ErrorPaymentMessage || this.state.SuccessPaymentMessage ? true : false)}</div>  
                <Form.Group controlId="basicForm" style={{ "margin": 30 }} >

                    <Form.Label className={ClassFirstname} style={styleFirstname}  >Firstname</Form.Label>
                    <Form.Control className={ClassFirstname} style={styleFirstname} ref={this.firstnameRef} type="firstname" onChange={this.handleChange} placeholder="firstname" name="firstname"></Form.Control>
                    
                   

                    <Form.Label className={classRegisterForm} style={styleLastname}>Lastname</Form.Label>
                    <Form.Control className={classRegisterForm} ref={this.lastnameRef} style={styleLastname} type="lastname" onChange={this.handleChange} placeholder="lastname" name="lastname"></Form.Control>
                    
                    {/** 
                    <Form.Label className={classRegisterForm} style={styleCell}>Cell</Form.Label>
                    <Form.Control className={classRegisterForm} style={styleCell} type="cell" onChange={this.handleChange} placeholder="cell" name="cell"></Form.Control>
                    */}
                    <Form.Label className={this.props.buttonText === "Register Now" ? classRegisterForm : classLogin} 
                    style={this.props.buttonText === "Register Now" ? classRegisterForm : classLogin}   >Username</Form.Label>
                    <Form.Control className={this.props.buttonText === "Register Now" ? classRegisterForm : classLogin} 
                        style={this.props.buttonText === "Register Now" ? classRegisterForm : classLogin}
                    ref={this.usernameRef} type="username" onChange={this.handleChange} placeholder="username" value={localStorage.getItem("username") }  name="username"></Form.Control>

                    <Form.Label className={classLogin} style={classLogin}  >Password</Form.Label>
                    <Form.Control className={classLogin} style={classLogin} ref={this.passwordRef} type="password" onChange={this.handleChange} placeholder="password" value={localStorage.getItem("password")} name="password"></Form.Control>

                    <Form.Label className={classRegisterForm} style={styleLastname}>Password</Form.Label>
                    <Form.Control className={classRegisterForm} ref={this.passwordRef1} style={styleLastname} type="password1" onChange={this.handleChange} placeholder="password" name="password1"></Form.Control>

                 
                    <Form.Label className={classRegisterForm} style={styleLastname}>Retype Password</Form.Label>
                    <Form.Control className={classRegisterForm} ref={this.passwordRef2} style={styleLastname} type="password2" onChange={this.handleChange} placeholder="password" name="password2"></Form.Control>

                    
                    {/*<Form.Label className={styleUploadForm} style={styleUploadForm}>Upload Image</Form.Label>*/}
                   <Form.Control className={styleUploadForm} ref={this.profileImage} id="KulaniImage2" style={styleUploadForm} type="file" onChange={this.handleChange} placeholder="profileImage" name="file"></Form.Control>
                   <Form.Control className={styleUploadForm}  id="KulaniImage3" style={styleUploadForm} type="hidden" onChange={this.handleChange} placeholder="profileImage" name="_id"></Form.Control>
                    

                    <Form.Label className={classPaymentForm} style={styleDate}  >Date</Form.Label>
                    <Form.Control className={classPaymentForm} ref={this.date} style={styleDate} type="date" onChange={this.handleChange} placeholder={new Date().toLocaleDateString()} name="date" ></Form.Control>
                    <Form.Label className={classPaymentForm}  style={styleAmount}  >Amount</Form.Label>
                    <Form.Control className={classPaymentForm} ref={this.amount} style={styleAmount} type="amount" onChange={this.handleChange} placeholder="R500.00" name="amount"></Form.Control>
                    
                    
                    {/*<Form.Label className={classPaymentForm} style={styleMemberId}   >Amount ID</Form.Label>
                    <Form.Control className={classPaymentForm} style={styleMemberId} type="memberid" onChange={this.handleChange} disabled="disabled" value={this.props.uniqueMemberid} name="memberid"></Form.Control>
                    */}
                    {/**   <Form.Text className="text-Muted">Just testing </Form.Text>*/}

                    <Button variant={this.props.buttonText === "Upload Image" ? "danger" :"primary"} style={{ "marginRight": 15, "marginBottom": 50, "marginTop": 20 }}
                     onClick={(e) => this.MemberRegistration(e)}
                     disabled={this.state.m_disableSubmitBtn}
                     
                     >{this.props.buttonText}
                    
                     </Button>
                    <Button variant="primary" style={{ "marginBottom": 50, "marginTop": 20 }} onClick={(props) => {this.props.ToggleModalState(props,"Cancel")}}>Cancel</Button> <br />

                </Form.Group>


            </Form>
        )
    }
}


export default StokvelForm
import React  from 'react'
import './SignIn.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
//import {Button, FormGroup, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Col, Input, FormText } from 'reactstrap';
import $ from 'jquery'
class SignIn extends React.Component{
state={
    email:'',
    password: '', 
    emailError:'',
    passwordError:'',
    mailSent:false,
    error:null
    
}

handleChange= (e) =>{
    const target=e.target
    const name = target.name
    const value = target.value

this.setState({
    [name]: value
})
}
/*
Check if there is a problems in the fields 
*/
validate = () => {
let emailError=""
let passwordError=''
let resEmail = true
let resPs= true
let totalRes=true
if(!this.state.email.includes('@')){
    emailError='Your email must have a "@"'
    this.setState({emailError})
    resEmail= false
    totalRes=false

}

if(!this.state.email.includes('.')){
    emailError= 'Your email must have a "."'
    this.setState({emailError})
    resEmail= false
    totalRes=false

}

if(this.state.email ===""){
    emailError='You must enter your email!'
    this.setState({emailError})
    resEmail= false
    totalRes=false

}


if (this.state.password === ''){
    passwordError='You must enter your password!'
    this.setState({passwordError})
    resPs= false  
      totalRes=false

}
 if (resPs=== true)
 { 
    passwordError=''
    this.setState({passwordError})
    
}
if (resEmail===true){
    emailError=''
    this.setState({emailError})
}
return  totalRes

}


handleSubmit = (e) => {
   e.preventDefault()
  if(this.validate()===true)
  {

  
  /**
   Create connexion with back end using axios
   */
   const url = "http://localhost:8080/backEndSignInReact/get_info_usersSignUp.php"

   const email=this.state.email
   const password=this.state.password
   axios.post(url,{email,password}, { headers: { 'Content-Type': 'application/json' }})
   .then(res=> {
       if(res.data.id === 1){
           alert('Sign in successufl Welcome!')
           $('.signInForm').hide(1000)

       }
       else{
           alert('Your email or password is incorect, please try again!')
       }
      
   })

  }
}

render(){
return(
/*
sign in form
*/
<Form className='signInForm'  onSubmit={this.handleSubmit} noValidate>
      <p id="p">Please complete the following fields:</p>
    <FormGroup row>
        <Label for="exampleemail" sm={4}>Email adresse</Label>
        <Col>
            <Input type='email' name='email' placeholder='Email adresse'
            value= {this.state.email}
            onChange={this.handleChange} required
            />
                 <p id='error_email'>{this.state.emailError} </p>
        </Col>
    </FormGroup>
    <FormGroup row>
        <Label for='examplePassword' sm={4}>Password</Label>
        <Col>
            <Input type='password' name='password'  placeholder='Password'
           value={this.state.password} onChange={this.handleChange}  required/>
           <p id='error_password'>{this.state.passwordError}</p>
        </Col>
    </FormGroup> 
    <FormGroup >
    <div className='form-check'>
    <input type='checkbox' className='form-check-input' id=' checkbox1' required/>
    <label className='form-check-label' >Remember me</label>
    </div>
    <p>Don't have an account?</p><Link className="nav-link" id='link_signIn' 
    to="/SignUp">Sign up here!</Link>
    </FormGroup>
    <Button  className='btn btn-block btn-success' id="submitButton">Sibmit</Button>
</Form>
)
}
}
export default SignIn
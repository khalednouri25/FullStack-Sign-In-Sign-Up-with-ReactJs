import React, { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './signup.css'
import $ from 'jquery'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Col, Input} from 'reactstrap';

class Signup extends React.Component{
    state={
        first_name:'',
        family_name:'',
        email:'',
        password:'',
        error_family_name:'',
        errorFirstName:'',
        error_password:'',
        error_email:''
    }
    /* method for check if there is a problems in the fields*/
    validateFields=()=>{
        let error_family_name=''
        let errorFirstName=''
        let error_password=''
        let error_email=''
        let error_field_email=false
        let error_field_password=false
        if(!this.state.email.includes('@')){
            error_email='Your email must have a "@"'
            this.setState({error_email})
            error_field_email=true
        }
        if(!this.state.email.includes('.')){
            error_email='Your email must have a "."'
            this.setState({error_email})
            error_field_email=true
        }
        if(this.state.email===""){
            error_email='You must enter your email!'
            this.setState({error_email})
            error_field_email=true
        }
        if(error_field_email===false){
            error_email=''
            this.setState({error_email})
        }
        if(this.state.family_name===""){
            error_family_name='You must enter your family name!'
            this.setState({error_family_name})
        }
        else{
            error_family_name=''
            this.setState({error_family_name})
        }
        if (this.state.first_name===''){
            errorFirstName='You must enter your first name!'
            this.setState({errorFirstName})
        }
        else{
            errorFirstName=''
            this.setState({errorFirstName})
        }
        
        if(this.state.password===""){
            error_password='You must enter your password!'
            this.setState({error_password})
            error_field_password=true
        }
        else
        if(this.state.password.length<8){
            error_password='Your password must have at least 8 characters!'
            this.setState({error_password})
            error_field_password=true
        }
        else
        {

             var capital_letters=/[A-Z]/
             if(!capital_letters.test(this.state.password)){
             error_password='Your password must have at least one capital letter!'
             this.setState({error_password})
             error_field_password=true
           }
             else
            {
                  var lower_letters=/[a-z]/
                  if(!lower_letters.test(this.state.password)){
                  error_password="Your email must have at least one lower lettrer!"
                  this.setState({error_password})
                  error_field_password=true
                
            }
                else
              {
                     var numbers=/[0-9]/
                     if(!numbers.test(this.state.password)){
                     error_password='Your email must have at least one number!'
                     this.setState({error_password})
                     error_field_password=true
                }

            }
        }
        }
        if(error_field_password===false){
            error_password=''
            this.setState({error_password})
        }
        if(error_field_email ===false && error_field_password===false) {
            return true
        }
        else
        {return false}

    }
    handledsubmit=(e)=>{
        e.preventDefault()
        if (this.validateFields())
        {
       /**
        create connexion with back end using axios
        */
        const url = "http://localhost:8080/backEndSignUpReact/get_info_usersSignUp.php"
        const first_name= this.state.first_name
        const family_name=this.state.family_name
        const email=this.state.email
        const password=this.state.password
        axios.post(url,{first_name,family_name,email,password}, {headers:{'Content-Type':'application/json'}})
        .then(res=> {
            if(res.data.id === 1){
                alert('Sign in successufl Welcome! '+ this.state.first_name+' '+this.state.family_name)
                $('#signUpForm').hide(1000)
     
            }
            else{
                alert('Your email or password is incorect, please try again!')
            }
           
        })
    }

    }
    handledChange=(e)=>{
        const target= e.target
        const name= target.name
        const value=target.value
    this.setState({
        [name]:value
    })

    }

render(){
return(
    /*
    Sign up form
    */
 <Form  id='signUpForm' onSubmit={this.handledsubmit} noValidate>
    <p id='pe'> Please complete the following fields:</p>
    <FormGroup >
        <Label>Family name:</Label>
        <Input type='text'  id='family_name'
            placeholder='Family name' onChange={this.handledChange} 
            value={this.state.family_name} name='family_name'
            required/>
        <p id='error_family_name'>{this.state.error_family_name}</p>
    </FormGroup>
    <FormGroup >
        <Label>First name:</Label>
        <Input type='text'  id='first_name' placeholder='First name' 
             onChange={this.handledChange} value={this.state.first_name}
             name='first_name' required/>
        <p id='error_family_name'>{this.state.errorFirstName}</p>
    </FormGroup>
    <FormGroup >
        <Label> Email adress:</Label>
        <Input type='email' id='email_signup' placeholder='Email' 
                onChange={this.handledChange}
                value={this.state.email} name='email'
                required/>
        <p id='email_error'>{this.state.error_email}</p>

    </FormGroup>
    <FormGroup>
        <Label>Password</Label>
        <Input type='password' id='passwordSignup' placeholder='Password' 
                onChange={this.handledChange}
                value={this.state.password} name='password'
                required/>
        <p id='error_password'>{this.state.error_password}</p>

    </FormGroup>
    <FormGroup>
    <div className='form-check'>
    <Input type='checkbox' className='form-check-input' id='exampleCheck'/>
        <Label className='form-check-label'>Remember me</Label>
        </div>
    </FormGroup>
    <div>Already have an account?<Link className="nav-link" id='link_signUp' to="/SignIn">Sign in here!</Link></div>
    <Button type='submit' className='btn btn-block btn-success btnSubmit'>Submit</Button>

</Form>

)
}
}
export default Signup
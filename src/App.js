import React from 'react';
import './App.css';
import Navbar from './NavBar/Navbar';
import {BrowserRouter, Route} from 'react-router-dom'
import SignIn from './SignIn/SignIn'
import Signup from './SignUp/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row} from 'reactstrap';
import { Button, Form, FormGroup, Label, Col, Input, FormText } from 'reactstrap';

function App() {

  return (
    <Container>
    <BrowserRouter>
    <div className="App">
    <Row>
    <Col>
    <Navbar/>
    </Col>
    </Row>
    <Row>
    <Col xs="12" s="12" md="4" lg="4">
     </Col>
    <Col xs="12" s="12" md="4" lg="4">
    <Route path='/SignIn' component={SignIn}/>
    <Route path='/SignUp' component={Signup}/>
     </Col>
     <Col xs="12" s="12" md="4" lg="4">
     </Col>
     </Row>
      </div>
    </BrowserRouter>
    </Container>
  );
}
export default App;

import {useState} from 'react'
import { signUp } from '../api/authApi';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"


const Register = ()=>{

    const [user , setUser] = useState({
        password : '' ,
        firstName : '' ,
        lastName : '' ,
        email : '' 
    }) ;

    const navigate = useNavigate()
    // react notification 
    const errorNotify = (value) => toast.error(value);
    const sucessNotify =(value)=>toast.success(value)
    const handelChange =(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }


    const handelSubmit=(e)=>{
        e.preventDefault();
        signUp(user)
        .then((doc)=>{
            
            sucessNotify(doc.msg);
            navigate("/login")
        })
        .catch((err)=>{
            
            errorNotify(err.response.data.msg)
        })
    }


    return (
 <div style={{
    margin: "10%", 
 display:"flex" , justifyContent:"space-between", alignItems:"center", flexWrap:"wrap"}}>
   <div style={{ width:"50%" , height:"400px" , backgroundColor:"aquamarine", display:"flex", justifyContent:"center",alignItems:"center"}}>
   <h1>SingUp</h1>
   </div>
    
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail" >
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={handelChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handelChange} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1" >
        <Form.Label>firstName</Form.Label>
        <Form.Control placeholder="firstName" name="firstName" onChange={handelChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2" >
        <Form.Label>lastName</Form.Label>
        <Form.Control placeholder="lastName" name="lastName" onChange={handelChange} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={(e)=>handelSubmit(e)}>
        Submit
      </Button>
      <p>You already have an account ? </p>
      <Link to="/login">login</Link>
    </Form>
     
        </div>
    )
} ;

export default Register ;
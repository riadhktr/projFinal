import { useState } from "react";
import { login } from "../api/authApi";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLocalStorage } from "../helpers/localStorage";





// const Login =()=>{

    

//     }

//     return (
//         <div>
//           <form>
//             <input type="email" name="email" onChange={handelChange}/>
//             <input type="password" name="password" onChange={handelChange}/>
//             <button onClick={(e)=>handelLogin(e)}>login</button>

//           </form>
//           <h1>{`welcome ${val}`}</h1>
          
//         </div>
//     )
// };



const Login=()=>{
    const [user , setUser] = useState({
        email : '' ,
        password : ''
    });

    const [val , setVal] =useState('')
    const handelChange =(e)=>{
        setUser({...user , [e.target.name]:e.target.value})
    } ;

    const navigate = useNavigate()
    // react notification 
    const errorNotify = (value) => toast.error(value);
    const sucessNotify =(value)=>toast.success(value)

    const handelLogin = (e)=>{
        e.preventDefault() ;
        login(user)
        .then((doc)=>{
            console.log(doc);
            setLocalStorage(doc.token , doc.chekEmail)
            sucessNotify(doc.msg);
            if(doc.chekEmail.role ==="user"){
              navigate('/')
            }else if(doc.chekEmail.role ==="admin"){
              navigate('/admin')
            }
            // setVal(doc.chekEmail.firstName)
        })
        .catch((err)=>{
            // console.log(err);
            errorNotify(err.response.data.msg)
        })
    ;}

  return (
    <div style={{
        margin: "10%", display:"flex" , justifyContent:"space-between", alignItems:"center", flexWrap:"wrap"}}>
        <div style={{ width:"50%" , height:"400px" , backgroundColor:"aquamarine", display:"flex", justifyContent:"center",alignItems:"center"}}>
            <h1>LOGIN</h1>
        </div>
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" placeholder="Email" name="email" onChange={handelChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handelChange} />
        </Col>
      </Form.Group>
      
      

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" onClick={(e)=>handelLogin(e)}>Sign in</Button>
        </Col>
      </Form.Group>
      <p>You don't have an account yet ? </p>
      <Link to="/register">register</Link>
    </Form>
    </div>
    // <h1>{`welcome ${val}`}</h1>

  );
} ;



export default Login ;
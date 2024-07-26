import {useEffect, useState} from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import { addProds, getCategory } from '../api/prodApi';




const AddProd = () =>{

    const [cat , setCat] = useState([]) ;

    useEffect(()=>{
        getCategory()
        .then ((file)=>{
            setCat(file.doc);
        })
        .catch((err)=>{
            console.error(err);
        })
    },[])

    const [addProd , setAddProd] = useState({
      
        nameProdut : '' ,
        price : null ,
        quantity : null ,
        productDescription : '' ,
        nameCat : '' ,

    }) ;

    const [image, setImage] = useState('')

    const navigate = useNavigate()
    
    const errorNotify = (value) => toast.error(value);
    const sucessNotify =(value)=>toast.success(value)
    const handelChange =(e)=>{
        setAddProd({...addProd,[e.target.name]:e.target.value})
    }

    const fileChange =(e)=>{
     setImage(e.target.files)
    }
 
    // console.log(addProd);

    const handelSubmit=(e)=>{
        e.preventDefault();

        let newProd = {
            nameProdut : addProd.nameProdut ,
            price : Number(addProd.price) ,
            quantity : Number(addProd.quantity) ,
            productDescription : addProd.productDescription,
            nameCat : addProd.nameCat ,
           image: image
        }

        console.log(newProd);
        
        let formData = new FormData();

        formData.append("nameProdut", newProd.nameProdut)
        formData.append("price", newProd.price)
        formData.append("quantity", newProd.quantity)
        formData.append("productDescription", newProd.productDescription)
        formData.append("nameCat", newProd.nameCat)
        formData.append("picture", newProd.image)


        
        // addProds(formData)
        // .then((doc)=>{
            
        //     sucessNotify(doc.msg);
        //     navigate("/")
        // })
        // .catch((err)=>{
            
        //     errorNotify(err.response.data.msg)
        // })
    }





    return(
        <div style={{
            margin: "10%", 
         display:"flex" , justifyContent:"space-between", alignItems:"center", flexWrap:"wrap"}}>
           <div style={{ width:"50%" , height:"400px" , backgroundColor:"aquamarine", display:"flex", justifyContent:"center",alignItems:"center"}}>
           <h1>ADD PRODUCT</h1>
           </div>
            
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail" >
                  <Form.Label>nameProdut</Form.Label>
                  <Form.Control type="text" placeholder="Enter " name="nameProdut" onChange={handelChange}/>
                </Form.Group>
        
                <Form.Group as={Col} controlId="formGridPassword" >
                  <Form.Label>price</Form.Label>
                  <Form.Control type="text" placeholder="price" name="price" onChange={handelChange} />
                </Form.Group>
              </Row>
        
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail" >
                  <Form.Label>quantity</Form.Label>
                  <Form.Control type="number" placeholder="Enter quantity" name="quantity" onChange={handelChange}/>
                </Form.Group>
        
                <Form.Group as={Col} controlId="formGridPassword" >
                  <Form.Label>image</Form.Label>
                  <Form.Control type="file" placeholder="image" name="picture" onChange={fileChange} />
                </Form.Group>
              </Row>

              <Row className="g-2">
      <Col md>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Comments"
        className="mb-3"
      >
      <Form.Control as="textarea" placeholder="Leave a comment here" name="productDescription" onChange={handelChange} />
      </FloatingLabel>
      </Col>
      <Col md>
        <FloatingLabel
          controlId="floatingSelectGrid"
          label="category"
        >
          <Form.Select aria-label="Floating label select example" name="nameCat" onChange={handelChange} >
            <option>Open this select category</option>
            {cat.map((item,index)=>{
                    return <option key={index}>{item.nameCat}</option>
                })}
            {/* <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
          </Form.Select>
        </FloatingLabel>
      </Col>
    </Row>
        
              <Button variant="primary" type="submit" onClick={(e)=>handelSubmit(e)}>
                ADD
              </Button>
          
            </Form>
             

             {/* <select>
                {cat.map((item,index)=>{
                    return <option key={index}>{item.nameCat}</option>
                })}
                
             </select> */}
                </div>
    )
} ;

export default AddProd ;






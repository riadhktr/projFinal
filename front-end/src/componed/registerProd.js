import REACT , {useEffect, useState} from "react"
import ProdCard from "./prodCard";
import { allProducts } from "../api/prodApi";





const Product =()=>{
   const [product , setProduct] = useState([]) ;

   console.log(product);
   useEffect(()=>{
    allProducts()
    .then((file)=>{
     setProduct(file.doc)
    })
    .catch((err)=>{
        console.log(err);
    })
   },[])
  return(
      <div style={{display:"flex" , justifyContent:"space-around", flexWrap:"wrap"}}>
        {product.map((element,index)=>{
          return <ProdCard prod={element} key={index}/>
        })}
        
      </div>
    )
  }
  
  
  export default Product;
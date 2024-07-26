import axios from "axios";


// register api call 

export const signUp =async(values)=>{

   let {data}= await axios.post("http://localhost:7000/auth/register",values)
  return data
} ;

export const login = async (values)=>{
    let {data}= await axios.post("http://localhost:7000/auth/login",values)
    return data
  } ;
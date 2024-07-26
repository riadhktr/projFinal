
import { Outlet , Navigate } from "react-router-dom";
import { getLocalStorage } from "../helpers/localStorage";

const UserRoute =()=>{

let token = getLocalStorage('token');
let user = getLocalStorage('User');

return token && user.role ==="user" ?
<Outlet/> 
: <Navigate to ="/login"/>

}


export default UserRoute;
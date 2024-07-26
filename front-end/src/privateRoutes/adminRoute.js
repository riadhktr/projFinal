
import { Outlet , Navigate } from "react-router-dom";
import { getLocalStorage } from "../helpers/localStorage";

const AdminRoute =()=>{

let token = getLocalStorage('token');
let user = getLocalStorage('User');

return token && user.role ==="admin" ?
<Outlet/> 
: <Navigate to ="/login"/>

}


export default AdminRoute;
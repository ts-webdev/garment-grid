import { useContext } from "react"
import { AuthContext } from "../context/Authcontext";


const useAuth=()=>{
    const authInfo = useContext(AuthContext);
    return authInfo;
}

export default useAuth;
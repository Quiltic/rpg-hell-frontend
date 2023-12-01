import { useContext, useDebugValue } from "react";
import {IAuthContext} from "../context/AuthProvider";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext) as IAuthContext;
    useDebugValue(auth, auth => auth?.username ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;
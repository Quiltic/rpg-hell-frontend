import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Login() {
    const { auth, setAuth } = useContext(AuthContext);
    // const {setAuth} = useContext(AuthContext) as IAuthContext;

    console.log(auth);
    console.log(setAuth);

    // useEffect here that calls the soon to be made axios provider to run Login

    return (
        <>
            <div>
                <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src="auth.avatarUrl"
                    alt=""
                ></img>
            </div>
        </>
    );
}

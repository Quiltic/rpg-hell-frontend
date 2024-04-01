import { Navigate } from "react-router-dom";

export default function LoginCallbackPage() {
    return <Navigate to={"/"} replace />;
}

export default function RickRoll() {
    return <Navigate to={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} replace />;
}

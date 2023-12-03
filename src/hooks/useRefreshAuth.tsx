import axios from "../api/axios";

const useRefreshToken = () => {
    const refresh = async () => {
        try {
            const response = await axios.get("/refresh", {
                withCredentials: true,
            });
            console.log(response.data);
            return true; // Login Refreshed
        } catch (err) {
            return false; // Logged Out
        }
        return;
    };
    return refresh;
};

export default useRefreshToken;

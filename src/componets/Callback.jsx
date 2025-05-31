import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// using useref to avoid rerenders 

function Callback() {
    const navigate = useNavigate();
    const hasRun = useRef(false);  

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const code = new URLSearchParams(window.location.search).get("code");

        if (code) {
            axios.post("http://localhost:8000/auth/discord", { code })
                .then((res) => {
                    console.log("Backend sending tokens", res.data);
                    navigate('/dashboard');
                })
                .catch((err) => {
                    console.log("Error from backend:", err.response?.data || err.message);
                });
        }

        console.log("Check");
    }, []);
    
    return null;
}

export default Callback;

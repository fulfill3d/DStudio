import {useEffect, useState} from "react";
import {validateToken} from "@/service/common/validate-token";

export const useValidateToken = async (token: string) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState("Unauthorized");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            validateToken(token).then(isValid => {
                setIsAuthenticated(isValid);
            }).catch(error => {
                setIsAuthenticated(false);
                setMessage(error.message);
            });
        }
    }, []);

    return {isAuthenticated};
};

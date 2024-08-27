'use client'

import {Provider} from "react-redux";
import store from "@/store/store";
import {DesignStudio} from "@/containers/design-studio";
import {validateToken} from "@/hooks/common/use-validate-token";
import {useEffect, useState} from "react";

export default function Home() {
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

    if (!isAuthenticated) {
        return <div>{message}</div>;
    }

  return (
      <Provider store={store}>
        <DesignStudio/>
      </Provider>
  );
}

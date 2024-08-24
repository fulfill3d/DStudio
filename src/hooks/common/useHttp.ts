import { useReducer, useEffect } from 'react';

const ACTIONS = {
    REQUEST_START: 'REQUEST_START',
    REQUEST_SUCCESS: 'REQUEST_SUCCESS',
    REQUEST_ERROR: 'REQUEST_ERROR'
};

const httpReducer = (state: any, action: any) => {
    switch (action.type) {
        case ACTIONS.REQUEST_START:
            return { ...state, isLoading: true, error: null };
        case ACTIONS.REQUEST_SUCCESS:
            return { ...state, isLoading: false, data: action.payload, error: null };
        case ACTIONS.REQUEST_ERROR:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

const useHttp = (url: string, method = 'GET', body = null, headers = {}) => {
    const initialState = {
        isLoading: false,
        error: null,
        data: null
    };

    const [state, dispatch] = useReducer(httpReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: ACTIONS.REQUEST_START });

            try {
                const response = await fetch(url, {
                    method,
                    body: body && JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json', ...headers }
                });

                if (!response.ok) {
                    throw new Error('Request failed!');
                }

                const data = await response.json();
                dispatch({ type: ACTIONS.REQUEST_SUCCESS, payload: data });
            } catch (error: any) {
                dispatch({ type: ACTIONS.REQUEST_ERROR, payload: error.message });
            }
        };

        fetchData();
    }, [url, method, body, headers]); // Ensure these values are stable

    return state;
};

export default useHttp;

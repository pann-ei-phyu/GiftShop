import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    // check for active http request(check pending requests)
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrlr = new AbortController();// controller to cancel http request
        activeHttpRequests.current.push(httpAbortCtrlr);
        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortCtrlr.signal
            });
            const responseData = await response.json();

            // dont remove if request is complete
            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrlr
            );

            if (!response.ok) {
                throw new Error(responseData.message || 'Something was wrong!');
            }
            setIsLoading(false);
            return responseData;
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
            throw error;
        }
    }, []);

    const clearError = () => setError(null);

    // cancel each active http request
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, [])

    return { isLoading, error, sendRequest, clearError };

}
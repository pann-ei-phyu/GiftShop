import {createRef} from 'react'
import './Login.css';
import {useHttpClient} from '../hooks/http-hook';
import { Redirect } from 'react';
import Login from './Login';
import {useNavigate} from 'react-router-dom';


const Register = props => {
    const navigate = useNavigate();
    
    let nameRef = createRef();
    let emailRef = createRef();
    let passwordRef = createRef();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const register = async () => {
        const username = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            const responseData = await sendRequest('http://localhost:8080/user/register', 'POST',
                JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            console.log(responseData);
            navigate('/login');
            //auth.login(responseData.id)
        } catch (error) {
            console.log(error);
            // setIsLoading(false);
            // setError(error.message || 'Something went wrong!');
        }
        
        

    }
    return (
        <div class="loginform">
            <label>Name</label> <br />
            <input type="text" ref={nameRef}></input> <br />
            <label>Email</label> <br />
            <input type="email" ref={emailRef}></input> <br />
            <label>Password</label> <br />
            <input type="password" ref={passwordRef}></input> <br />
            <button onClick={register}> Register </button> 

        </div>
        
    )
}

export default Register;
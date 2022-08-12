import './Login.css';
import {createRef} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useHttpClient} from '../hooks/http-hook';


const Login = props => {
    const navigate = useNavigate();

    let emailRef = createRef();
    let passwordRef = createRef();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    
    
    const login = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        try {
            const responseData = await sendRequest('http://localhost:8080/user/login', 'POST',
                JSON.stringify({
                    email: email,
                    password: password,
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            console.log(responseData.token);
            localStorage.setItem("token" , responseData.token);
            localStorage.setItem("userId", responseData.userId);
            navigate('/');
            //console.log(token);
            //auth.login(responseData.id)
        } catch (error) {
            console.log(error);
            // setIsLoading(false);
            // setError(error.message || 'Something went wrong!');
        }
    }
    return (
        <div class="loginform">
            <label>Email</label> <br />
            <input type = "email" ref={emailRef} /> <br />
            <label>Password</label> <br />
            <input type = "password" ref={passwordRef}/> <br />
            <button onClick = {login}> Login</button> <br /> <br />
            <NavLink to="/register">New user? Register</NavLink>
        </div>
    )
}

export default Login;
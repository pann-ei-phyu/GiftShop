import './Header.css';
import {NavLink} from 'react-router-dom'
const Header = props => {
    return (
        <div class="topnav">
            <ul class="navlink">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/add-product">Product</NavLink></li>
                <li><NavLink to="/login" exact>Login</NavLink></li>
                <li><NavLink to="logout"> Logout</NavLink></li>
            </ul>
        </div>      
    )
}

export default Header;
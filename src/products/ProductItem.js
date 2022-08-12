
import { NavLink } from 'react-router-dom';
import './ProductItem.css';
import Products from './ShowAll';
import {useHttpClient} from '../hooks/http-hook';


const ProductItem = props => {
    
    
    
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const deleteProduct = async () => {
       
        try {
            const responseData = await sendRequest('http://localhost:8080/delete-product/' + props.id, 'DELETE', null,
                {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + props.token
                }
            );

            props.removeProduct(props.id);

            console.log(responseData);
            //auth.login(responseData.id)
        } catch (error) {
            console.log(error);
            // setIsLoading(false);
            // setError(error.message || 'Something went wrong!');
        }
    }
    return (
        <div class="productItem">
            <div>
                <img src={'http://localhost:8080/' + props.imageUrl} width="200px" height="200px"></img>
            </div>
            <div>
                <h4>{props.title}</h4>
                <span>{props.price}</span>
                <p>{props.description}</p>
            </div>
            <div>
                {props.isUser
                ? 
                false
                : 
                <div class="product-btn">
                        <NavLink to={`/edit-product/${props.id}`} > Edit</NavLink> 
                        <button onClick={deleteProduct}>Delete</button>
                </div>
                }
            </div>





                
            
        </div>
    )
}
export default ProductItem;
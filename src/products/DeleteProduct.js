import './Product.css';
import { createRef } from 'react';
import {useHttpClient} from '../hooks/http-hook';

const DeleteProduct = () => {
    let titleRef = createRef();
    let priceRef = createRef();
    let imageUrlRef = createRef();
    let descriptionRef = createRef();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const editProduct = async () => {
        const updateTitle = titleRef.current.value;
        const updatePrice = priceRef.current.value;
        const updateImageUrl = imageUrlRef.current.value;
        const updateDescription = descriptionRef.current.value;
        try {
            const responseData = await sendRequest('http://localhost:8080/edit-product', 'POST',
                JSON.stringify({
                    updateTitle: updateTitle,
                    updatePrice: updatePrice,
                    updateImageUrl: updateImageUrl,
                    updateDescription: updateDescription
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…QxMn0.nbxEO2Mkgm9ly1sSgaL1vPTS5vqSk0H1U3wKKbUjyBU'
                }
            );
            console.log(responseData);
            //auth.login(responseData.id)
        } catch (error) {
            console.log(error);
            // setIsLoading(false);
            // setError(error.message || 'Something went wrong!');
        }
    }
    return (
        <div class="product">
            <h3>Product deleted</h3>
        </div>
    )
}

export default DeleteProduct;
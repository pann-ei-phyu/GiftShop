import React, { useEffect, useState } from 'react'

import { useHttpClient } from '../hooks/http-hook'
import ProductItem from './ProductItem'

const ShowAll = props => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState()
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedProduct, setLoadedProduct] = useState();

    const removeProduct = (productId) => {
        setLoadedProduct(
            loadedProduct.filter(product => product._id != productId)
            )

    }


    useEffect(() => {
        const getAllProducts = async () => {
            
            // setIsLoading(true);
            try {
                const responseData = await sendRequest('http://localhost:8080/products');
                setLoadedProduct(responseData.products);
                console.log(responseData.products);
            } catch (error) {
                // setError(error.message);
                // setIsLoading(false);
            }
        }
        getAllProducts();
    }, []);
    // const errorHandler = () => setError(null);
    
   return (
   <div>
        {loadedProduct?.map(i =>{
            return (
                <ProductItem 
                    token = {token}
                    id = {i._id}
                    imageUrl = {i.imageUrl}
                    title = {i.title}
                    price = {i.price}
                    description = {i.description}
                    isUser = {i.creator != userId}
                    removeProduct = {removeProduct}
                />
            )
        })}
   </div>
    
   )   
}

export default ShowAll
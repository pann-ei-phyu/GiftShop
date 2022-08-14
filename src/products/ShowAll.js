import React, { useEffect, useState } from 'react'

import { useHttpClient } from '../hooks/http-hook'
import ProductItem from './ProductItem'
import './ShowAll.css'

const ShowAll = props => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState()
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedProduct, setLoadedProduct] = useState();
    const [pageRange, setPageRange] = useState([1]);

    const removeProduct = (productId) => {
        setLoadedProduct(
            loadedProduct.filter(product => product._id != productId)
            )

    }


    useEffect(() => {
        getAllProducts(1);
    }, []);
    // const errorHandler = () => setError(null);

    const getAllProducts = async (requestedPage) => {
            
        // setIsLoading(true);
        try {
            const responseData = await sendRequest(`http://localhost:8080/products?page=${requestedPage}` );
            setLoadedProduct(responseData);
            setPageRange(range(1,responseData.totalPage));
            console.log(responseData);
        } catch (error) {
            // setError(error.message);
            // setIsLoading(false);
        }
    }


    const handlePageClick = (requestPage) => {
        getAllProducts(requestPage)
    }


    function range (start, end) {
        const page = [];
        for (let p = start; p <= end; p++) {
            page.push(p);   
        }
        return page;
   }

   return (
        <div>
                {loadedProduct?.products?.map(i =>{
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
                <div class="paganation">
                    { 
                        pageRange.map(page => {
                            return(
                            <button className={page != loadedProduct?.currentPage ? null : 'active-page'} onClick={_ => handlePageClick(page)}>
                                {page}
                            </button>
                            )
                        })
                    
                    }
                    
                </div>
                
        </div>
    
   )   
}

export default ShowAll
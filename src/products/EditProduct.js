import './Product.css';
import { createRef } from 'react';
import {useHttpClient} from '../hooks/http-hook';
import {useState} from 'react';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom'


const EditProduct = (props) => {
    const {productId} = useParams();

    const token = localStorage.getItem("token");
    
    let titleRef = createRef();
    let priceRef = createRef();
    let imageRef = createRef();
    let descriptionRef = createRef();
    const [file, setFile] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [loadedProduct, setLoadedProduct] = useState();

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        //console.log(e.target.files[0]);
        console.log(file);
        
    };
    useEffect(() => {
        const fetchProduct = async () => {
            console.log('test')
            try {
                const responseData = await sendRequest(
                    'http://localhost:8080/edit-product/' + productId, 'GET',
                    null,
                    {
                        'Authorization' : 'Bearer ' + token
                    }
                );
                setLoadedProduct(responseData.product);
                
                //console.log(loadedProduct);
                
            } catch (err) {
                console.log(err);
             }
        };
        fetchProduct();
    }, []);


    const editProduct = async () => {
        const updateTitle = titleRef.current.value;
        const updatePrice = priceRef.current.value;
        const updateDescription = descriptionRef.current.value;

        console.log(updateTitle, updatePrice, updateDescription);

        const formData = new FormData();
        formData.append('title', updateTitle);
        formData.append('price', updatePrice);
        formData.append('image', file);
        formData.append('description', updateDescription);
        
        try {
            const responseData = await sendRequest('http://localhost:8080/edit-product/' + productId, 'PUT',
            formData,
                {
                    //'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
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
            <label>Update Title</label> <br />
            <input type="text" ref={titleRef} defaultValue={loadedProduct ? loadedProduct.title : ""}></input> <br />
            <label>Update Price</label> <br />
            <input type="number" ref={priceRef} defaultValue={loadedProduct ? loadedProduct.price : ""}></input> <br />
            <label>Update Image</label> <br />
            <input type="file"  onChange={saveFile} /> <br />
            <label>Update Description</label> <br />
            <textarea ref={descriptionRef}  defaultValue={loadedProduct ? loadedProduct.description : ""}></textarea> <br />
            <button onClick={editProduct}>Edit Product</button>
        </div>
    )
}

export default EditProduct;
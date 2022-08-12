import './Product.css';
import { createRef } from 'react';
import { useState } from 'react';
import {useHttpClient} from '../hooks/http-hook';
import { Navigate} from 'react-router-dom';


const AddProduct = (props) => {
   
     const token = localStorage.getItem("token");
    
    let titleRef = createRef();
    let priceRef = createRef();

    let descriptionRef = createRef();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [file, setFile] = useState();
 
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
        console.log(file);
        
    };
    
    const createProduct = async () => {
        //console.log("Call me back");
        const title = titleRef.current.value;
        const price = priceRef.current.value;

        const description = descriptionRef.current.value;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('image', file);
        formData.append('description', description);
        console.log(formData);
        try {
            
            //('Content-Type', 'application/json');
            //('Authorization' , 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…QxMn0.nbxEO2Mkgm9ly1sSgaL1vPTS5vqSk0H1U3wKKbUjyBU');

            const responseData = await sendRequest('http://localhost:8080/add-product', 'POST', formData,
                {
                    //"Accept" : "multipart/form-data", 
                    //"Content-Type": "multipart/form-data",
                    "Authorization" : "Bearer " + token
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
        token ? 
        <div class="product">
                <label>Title</label> <br />
                <input type="text" name="title" ref={titleRef} /> <br />
                <label>Price</label> <br />
                <input type="number" name="price" ref={priceRef} /> <br />
                <label>Image</label> <br />
                <input type="file" name="image" onChange={saveFile}/> <br />
                <label>Description</label> <br />
                <textarea ref={descriptionRef} name="description" /> <br />
                <button onClick={createProduct}>Create Product</button>
        </div>
        : <Navigate to="/login" />
    )
    
}

export default AddProduct;


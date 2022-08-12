import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Auth from './components/Auth';
import Register from './components/Register';
import AddProduct from './products/AddProduct';
import ShowAll from './products/ShowAll';
import EditProduct from './products/EditProduct';
import DeleteProduct from './products/DeleteProduct';
import Logout from './components/Logout';
import {useState} from 'react'
const App = props => {
 
  return ( 
        <Router>
          <Header></Header> 
            <Routes>
              <Route path="/login" element={<Auth />} /> 
              <Route path="/register" element={<Register /> }></Route>
              <Route path="/add-product" element={<AddProduct />}></Route>
              <Route path="/" element={<ShowAll />}></Route>
              <Route path="/edit-product/:productId" element={<EditProduct />}></Route>
              <Route path="/delete-product" element={<DeleteProduct />}></Route>
              <Route path="/logout" element={< Logout />}></Route>
            </Routes>
        </Router>
  )
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
import Header from './Component/layout/Header/Header'
import Footer from './Component/layout/Footer/Footer'
import ProductDetails from './Component/Product/ProductDetails'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import LoginSignUp from './Component/user/LoginSignUp';
import WebFont from 'webfontloader'
import React from 'react';
import Products from './Component/Products/Products'
import Search from './Component/Products/Search'
import store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from './Component/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import Profile from "./Component/user/Profile.js"
import ProtectedRoute from './Component/Route/ProtectedRoute';
import UpadteProfile from './Component/user/UpadteProfile.js'
import UpdatePassword from './Component/user/UpdatePassword.js'
import ForgotPassword from './Component/user/ForgotPassword.js'
import ResetPassword from './Component/user/ResetPassword.js'
import Cart from "./Component/Cart/Cart.js"
import Shipping from './Component/Cart/Shipping.js'
import ConfirmOrder from './Component/Cart/ConfirmOrder.js'
import Payment from './Component/Cart/Payment.js'
import axios from "axios"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSuccess from './Component/Cart/OrderSuccess';
import MyOrders from  './Component/Order/MyOrders.js'
import OrderDetails from "./Component/Order/OrderDetails.js"
import Dashboard from "./Component/admin/Dashboard.js"
import ProductList from "./Component/admin/ProductList.js"
import NewProduct from "./Component/admin/NewProduct.js"
import UpdateProduct from "./Component/admin/UpdateProduct.js"
import OrderList from "./Component/admin/OrderList.js"
import ProcessOrder from "./Component/admin/ProcessOrder.js"
import UserList from "./Component/admin/UserList.js"
import UpdateUser from './Component/admin/UpdateUser.js'
import ProductReviews from "./Component/admin/ProductReviews.js"




function App() {



  const { isAuthenticated, user } = useSelector(state => state.user);


  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);


  }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid sans', 'Chilanka']
      }
    });

    store.dispatch(loadUser())
    getStripeApiKey();
  }, [])

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>

        <Route exact path="/product/:id" >
          <ProductDetails />
        </Route>

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/profile/update" component={UpadteProfile} />

        <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />




        <ProtectedRoute exact path="/success" component={OrderSuccess} />    

        <ProtectedRoute exact path="/orders" component={MyOrders} />   

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />   

        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />    

        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />    

        <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />    

        <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />    

        <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />    

        <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />    

        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UserList} />    

        <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />    

        <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews} />    


             

        <Route exact path="/products" >
          <Products />
        </Route>

        <Route exact path="/Cart" >
          <Cart />
        </Route>

        <Route exact path="/password/forgot" >
          <ForgotPassword />
        </Route>

        <Route exact path="/password/reset/:token" >
          < ResetPassword />
        </Route>

        <Route exact path="/Search" >
          <Search />
        </Route>

        <Route exact path="/login" >
          <LoginSignUp />
        </Route>

        <Route path="/products/:keyword" >
          <Products />
        </Route>

      </Switch>
      
      
      {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)} >

      <ProtectedRoute exact path="/process/payment" component={Payment} />
      </Elements>

      )}


      <Footer />
    </Router>




  );
}

export default App;

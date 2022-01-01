import {React, Fragment,useEffect} from 'react'
import {CgMouse} from 'react-icons/all'
import Loading from '../Component/layout/loader/Loader'
import './Home.css'
import Product from './Product'
import MetaData from '../Component/layout/MetaData'
import {getProduct} from '../actions/productAction'
import {useDispatch, useSelector} from  'react-redux'
import { useAlert } from 'react-alert'

// const product = {
//   name:"BlueShirt",
//   images:[{url:{top1}}],
//   price:"$30",
//   _id:"megaus"
// };

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading,error,products} = useSelector(
      (state)=>state.products
  );
   


  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);

    return (
    <Fragment>
      {loading ? <Loading/>:  <>
      <MetaData title="Ecommerce" />
      <div className="banner">
          <p>Welcome to Ecommorce</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>

          <a href="#container">
            <button> 
             Scroll <CgMouse/>
            </button>
          </a>
      </div>

      <h2 className='homeHeading'>Featured Product</h2>
      <div className='container' id='container'>
           {products && products.map((product)=> <Product product={product} />)}
      </div>
      </>}
    </Fragment>
    );
}

export default Home

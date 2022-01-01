import React, { Fragment,useState,useEffect } from 'react'
import './ForgotPassword.css'
import Loader from '../layout/loader/Loader'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,forgotPassword} from "../../actions/userAction";
import {useAlert} from 'react-alert'
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
   

    const forgotPasswordSubmit = (e) =>{
        e.preventDefault();
   
        const myform = new FormData();
   
        myform.set('email',email);
        dispatch(forgotPassword(myform));
      
      }


    const {error,message,loading} =useSelector(state=> state.forgotPassword);

    const [email, setEmail] = useState("");


    useEffect(() => {
        
        if(error){
            alert.error(error)
            dispatch(clearErrors());
           }
        
        if(message){
            alert.success(message);
        }
    }, [error,message,alert,dispatch])
    return (
        <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Forgot password " />
            <div className="forgotPasswordContainer">
              <div className="forgotPasswordBox">
                <h2 className="forgotPasswordHeading">Forgot password </h2>
  
                <form
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}
                >
               
                  <div className="forgotPasswordEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
  
                  <input
                    type="submit"
                    value="Send"
                    className="forgotPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    )
}

export default ForgotPassword

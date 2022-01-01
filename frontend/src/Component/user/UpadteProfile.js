import React, { Fragment,useState,useEffect } from 'react'
import './UpdateProfile.css'
import Loader from '../layout/loader/Loader'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,loadUser,updateProfile} from "../../actions/userAction";
import {useAlert} from 'react-alert'
import {useHistory} from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from "../layout/MetaData";


const UpadteProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    let history = useHistory();

    const {user} =useSelector(state=> state.user);

    const {error,isUpdated,loading} =useSelector(state=> state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
     const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
   
     const  updateProfileSubmit  = (e) =>{
        e.preventDefault();
   
        const myform = new FormData();
   
        myform.set('name',name);
        myform.set('email',email);
        myform.set('avatar',avatar);
        dispatch(updateProfile(myform));
      
      }
   
   
      const updateProfileDataChange = (e) => {
    
         const reader = new FileReader();
   
         reader.onload = () => {
           if (reader.readyState === 2) {
             setAvatarPreview(reader.result);
             setAvatar(reader.result);
           }
         };
   
         reader.readAsDataURL(e.target.files[0]);
     };
   
     useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
          }


        if(error){
         alert.error(error)
         dispatch(clearErrors());
        }
 
        if(isUpdated){
        alert.success("profile has been updated");
        dispatch(loadUser())
         history.push('/account')

         dispatch({
             type:UPDATE_PROFILE_RESET
         })
       }
 
      }, [error,dispatch,alert,isUpdated,history,user]);

    return (
        <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Update Profile" />
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
  
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="updateProfileName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
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
  
                  <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    )
}

export default UpadteProfile

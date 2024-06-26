import PhotoSubmitForm from "./PhotoSubmitForm";
import ProfileEditForm from "./ProfileEditForm";
import userContext from "./userContext";
import { useContext } from "react";
import "./ProfilePage.css";


/** ProfilePage component for Friender
 *
 * Props:
 * - updateUser(): function to call in parent
 * - updatePhoto(): function to call in parent
 *
 * State: none
 *
 * RoutesList -> ProfilePage
 */
function ProfilePage({ updateUser, updatePhoto }) {
  const { user } = useContext(userContext);

  return (
    <div className="ProfilePage">
      <h1 className="ProfilePage-Title mb-5">Edit {user.username}'s Profile!</h1>
      <div className="ProfilePage-Container">
        <div className="ProfilePage-Photo">
          <h3>Change your profile picture!</h3>
          <PhotoSubmitForm updatePhoto={updatePhoto} />
        </div>
        <div className="ProfilePage-EditForm">
          <h3>Edit your profile details!</h3>
          <ProfileEditForm updateUser={updateUser} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
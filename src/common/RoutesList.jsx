import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import ProfilePage from '../user/ProfilePage';
import { useContext } from "react";
import userContext from '../user/userContext';

/** Component to hold all routes.
 *
 * Props:
 * - login(): fn to call in parent
 * - register(): fn to call in parent
 * - updateUser(): fn to call in parent
 * - updatePhoto(): fn to call in parent
 *
 * State: none
 *
 * App -> RoutesList -> {FindFriends, Matches, HomePage,
 *                      ProfilePage, LoginForm, RegisterForm}
 */


function RoutesList({ login, register, updateUser, updatePhoto }) {
    const { user } = useContext(userContext);

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            {user
                ? <>
                    {/* <Route path='/find-friends' element={<FindFriends />} />
                    <Route path='/companies/:handle' element={<CompanyDetail applyToJob={applyToJob} />} />
                    <Route path='/jobs' element={<JobList applyToJob={applyToJob} />} /> */}
                    <Route path='/profile' element={<ProfilePage updatePhoto={updatePhoto} updateUser={updateUser} />} />
                </>
                : <>
                    <Route path='/login' element={<LoginForm login={login} />} />
                    <Route path='/register' element={<RegisterForm register={register} />} />
                </>
            }
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    );
}

export default RoutesList;
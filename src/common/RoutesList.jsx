import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import ProfilePage from '../user/ProfilePage';
import { useContext } from "react";
import userContext from '../user/userContext';

/** Component to hold all routes.
 *
 * State:
 * - login(): fn to call in parent
 * - signup(): fn to call in parent
 *
 * Props: none
 *
 * App -> RouteList -> {HomePage, CompanyList, CompanyDetail, JobList,
 *                      ProfileForm, LoginForm, SignupForm}
 */


function RoutesList({ login, register, updateUser, updatePhoto }) {
    console.log("in rendering RouteList");
    const { user } = useContext(userContext);

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            {user
                ? <>
                    {/* <Route path='/' element={<CompanyList />} />
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
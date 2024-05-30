import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './common/NavBar';
import RoutesList from './common/RoutesList';
import userContext from './user/userContext';
import LoadingSpinner from './common/LoadingSpinner';
import useAuth from './hooks/useAuth';

/** Component for entire page.
 *
 * Props: none
 *
 * State: none
 *
 * App -> { Navbar, RoutesList }
*/

function App() {
  const { user, setUser, token, login, register, updateUser, updatePhoto, logout } = useAuth("token");

  if (token && !user) return <LoadingSpinner />;

  return (
    <div className="App">
      <userContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <NavBar logout={logout} />
          <RoutesList login={login} register={register} updateUser={updateUser} updatePhoto={updatePhoto} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;

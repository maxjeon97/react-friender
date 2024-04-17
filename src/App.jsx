import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import RoutesList from './RoutesList';
import userContext from './userContext';
import LoadingSpinner from './LoadingSpinner';

/** Component for entire page.
 *
 * Props: none
 *
 * State: none
 *
 * App -> { Navbar, RoutesList }
*/

function App() {
  const { user, token, login, register, updateUser, logout } = useAuth("token");

  if (token && !user) return <LoadingSpinner />;

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <NavBar logout={logout} />
          <RoutesList login={login} register={register} updateUser={updateUser} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;

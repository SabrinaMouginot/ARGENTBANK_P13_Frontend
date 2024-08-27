import { Link } from 'react-router-dom';
import argentBankLogo from '/argentBankLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';

function Header() {
  const { isAuthenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to="/login">
          {
            isAuthenticated && <div>
            <i className="fa fa-user-circle"></i>
            <span>Steve</span>
          </div>
          }
          <span onClick={onLogout}>{isAuthenticated ? "Sign Out" : "Sign In"}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;

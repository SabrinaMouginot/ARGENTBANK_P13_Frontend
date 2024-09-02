import '../css/main.css';
import Header from '../components/header';
import Footer from '../components/footer';
import BankAccount from '../components/BankAccount';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserData } from '../../slices/userSlice';

function ProfilePage() {
  const dispatch = useDispatch();
  const { firstName, lastName, loading, error } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);

  // Déclencher l'appel à fetchUserData lorsqu'un token est présent
  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [token, dispatch]);
  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <div className="header">
        {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          // <h1>Welcome back<br />Tony Jarvis!</h1>
        )}
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <BankAccount 
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <BankAccount 
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <BankAccount 
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
      <Footer />
    </div>
  );
}

export default ProfilePage;

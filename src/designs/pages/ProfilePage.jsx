import { useState, useEffect } from 'react';
import '../css/main.css';
import Header from '../components/header';
import Footer from '../components/footer';
import BankAccount from '../components/BankAccount';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, toggleEditForm, updateUserData } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const dispatch = useDispatch();
  const { firstName, lastName, error, isEditing } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  // State local pour les valeurs du formulaire
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);

  // Déclencher l'appel à fetchUserData lorsqu'un token est présent
  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    } else if (!token || error) {
      navigate("/login")
    }
  }, [token, navigate, dispatch, error]);

  useEffect(() => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
  }, [firstName, lastName]);



    const submit = (e) => {
      e.preventDefault()

    // Appel de la fonction asynchrone pour mettre à jour les données utilisateur
    dispatch(updateUserData({ token, firstName: newFirstName, lastName: newLastName }));
      // dispatch(toggleEditForm())
    }

    const editMode = () => {
      dispatch(toggleEditForm())
    }

    return (
      <div>
        <Header />
        <main className="main bg-dark">

          {
            !isEditing ? <div className="header">

              <p>Loading...</p>

              <h1>Welcome back<br />{firstName} {lastName}!</h1>

              <button onClick={editMode} className="edit-button">Edit Name</button>
            </div>
              :
              <form onSubmit={submit} >
                <input type="text" name="firstName" />
                <input type="text" name='lastName' />
                <button onClick={editMode} className="edit-button">Cancel</button>
                <button className="edit-button" type='submit' >Submit</button>
              </form>
          }
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
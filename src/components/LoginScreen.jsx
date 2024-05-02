import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);

      navigate('/backoffice');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>LoginScreen</h1>
      <div>
        <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div>
        <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
        <input style={{marginBottom:"30px"}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password" autocomplete="off"/>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
            <button class="btn btn-primary" onClick={signIn}>Connexion</button>
        </>
      )}
    </div>
  );
};

export default LoginScreen;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
};
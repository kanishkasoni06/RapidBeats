import "./Auth.css";
import googleImg from "../assets/google.png";
import { auth } from "../security/firebase";
import firebase from "../security/firebase";

const Auth = () => {
  const handleSignInWithGoogle = () => {
    // Create a Google sign-in provider
    const provider = new firebase.auth.GoogleAuthProvider();

    // Sign in with Google using a popup window

    auth.signInWithPopup(provider).catch((error) => {
      // Handle sign-in errors if needed
      console.error(error);
    });
  };
  return (
    <div className="background">
      <nav className="flex">
        <h3 className="gradient">Musically</h3>
        <button className="btnAuth" onClick={handleSignInWithGoogle}>
          Get Started
        </button>
      </nav>
      <main className="flex">
        <h1>The Best Music App for</h1>
        <h2 className="gradient">Music Discovery and Management</h2>
        <p className="lightText subline">Unleash the Rhythm of Your Tunes!</p>
        <button onClick={handleSignInWithGoogle} className="btnAuth signInBtn">
          <img src={googleImg} width="40px" />
          <span className="">SignIn With Google</span>
        </button>
        <p className="lightText">No credit card required.</p>
      </main>
    </div>
  );
};

export default Auth;

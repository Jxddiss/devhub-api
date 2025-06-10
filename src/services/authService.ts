import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export const signUpWithEmail = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

//À rajouter plus tard pour les autres providers
// export const signInWithGithub = async () => {
//   const provider = new GithubAuthProvider();
//   return signInWithPopup(auth, provider);
// };

// export const signInWithMicrosoft = async () => {
//   const provider = new OAuthProvider("microsoft.com");
//   return signInWithPopup(auth, provider);
// };

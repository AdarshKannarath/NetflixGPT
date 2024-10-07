import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../util/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../util/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../util/userSlice";
import { BG_IMG_URL } from "../util/constants";
// import { USER_AVATAR } from "../util/constants";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  function handleSubmission() {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      //signup logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          setErrorMessage(error.code + " " + error.message);
        });
    } else {
      //signin logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .catch((error) => {
          setErrorMessage(error.code + " " + error.message);
        });
    }
  }

  function handleSignInToggle() {
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
      <Header />
      <div className="absolute w-full h-full">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          src={BG_IMG_URL}
          alt="Background Image"
          className="w-full h-full object-cover"
        />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 p-12 absolute bg-black bg-opacity-65 my-36 mx-auto right-0 left-0 text-white rounded-lg">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (<input
          type="text"
          placeholder="Full Name"
          ref={name}
          className="p-4 my-4 w-full bg-black bg-opacity-70"
        />)}
        <input
          type="email"
          placeholder="Email"
          ref={email}
          className="p-4 my-4 w-full bg-black bg-opacity-70"
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="p-4 my-4 w-full bg-black bg-opacity-50"
        />

        <p className="text-red-700 font-bold text-md">{errorMessage}</p>
        <button type="button" onClick={handleSubmission} className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className="p-4">{isSignInForm ? "New to Netflix?" : "Already a user?"} <button type="button" onClick={handleSignInToggle} className="cursor-pointer underline font-semibold">{isSignInForm ? "Sign Up Now" : "Sign In Now"}</button></p>
      </form>
    </div>
  );
};

export default Login;

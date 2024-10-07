import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../util/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../util/userSlice";
import { LOGO } from "../util/constants";
import { toggleGptSearchView } from "../util/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  function handleSignOut() {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  function handleGptSearchToggle() {
    if (showGptSearch) {
      // If currently showing GPT search, navigate back to homepage
      navigate("/browse");
    }
    dispatch(toggleGptSearchView());
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44 cursor-pointer" src={LOGO} alt="logo" onClick={() => navigate("/browse")} />

      {user && (
        <div className="relative z-20">
          <div className="flex items-center">
            <select className="p-2 bg-gray-900 text-white cursor-pointer">
              <option value="en">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
            </select>
            <button
              className={`text-white py-2 px-4 m-2 rounded-md cursor-pointer ${showGptSearch ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-800 hover:bg-purple-900'
                }`}
              onClick={handleGptSearchToggle}
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
            <img className="w-12 h-12 cursor-pointer" src={user.photoURL} alt="usericon" />
            <div
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="ml-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="white"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {dropdownVisible && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-black bg-opacity-75 rounded-lg shadow-xl">
              <button
                onClick={handleSignOut}
                className="block px-4 py-2 text-white hover:bg-opacity-50 hover:bg-gray-700 w-full text-left cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
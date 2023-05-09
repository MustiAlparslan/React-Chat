import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routes from "./routes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fbConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveUser } from "./redux/UserSlice";

function App() {
  const showRoutes = useRoutes(routes);
  const dispatch = useDispatch();

  
  const formatUser = (user) => {
    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const formattedUser = formatUser(currentUser);
        dispatch(setActiveUser(formattedUser));
      } else {
        dispatch(setActiveUser(null));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {showRoutes}
    </>
  );
}

export default App;

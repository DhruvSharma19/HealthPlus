import { useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import { useGlobalContext } from "./context";

const SignIn = () => {
  const { email, submitLogin, username, password, submitRegistration } =
    useGlobalContext();

  const userObject = useRef({});

  const handleCallback = async (response, event) => {
    console.log(response.credential);
    userObject.current = jwt_decode(response.credential);
    console.log(userObject.current);

    username.current = userObject.current.name;
    email.current = userObject.current.email;
    password.current = response.credential.slice(0, 8);

    console.log(username.current);
    console.log(email.current);
    console.log(password.current);

    try {
      const fetchResponse = await fetch(
        "http://127.0.0.01:8000/check_email?email=" + email.current
      );
      const data = await fetchResponse.json();
      console.log(data.email_exists);

      if (data.email_exists) {
        submitLogin(event);
      } else {
        submitRegistration(event);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id:
          "400096200976-8a5jsv00o9pnijg0mq64hh3oer3nnbab.apps.googleusercontent.com",
        callback: (response) => handleCallback(response, null),
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };

    initializeGoogleSignIn();
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
};

export default SignIn;

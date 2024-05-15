import { useGlobalContext } from "./context";
import { TextField, Button } from "@mui/material";

import cancelIcon from "../img/cross icon.svg";
import { useState } from "react";
import SignIn from "./GoogleSignIn";

const RegisterForm = () => {
  const { submitRegistration, email, username, password, closeModal } =
    useGlobalContext();

  const [user_email, setUserEmail] = useState();
  const [user_username, setUserUsername] = useState();
  const [user_password, setUserPassword] = useState();
  const [emailExists, setEmailExists] = useState();

  // Regular expression for password check
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const isPasswordValid = (password) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isPasswordValid(user_password)) {
      try {
        const fetchResponse = await fetch(
          `http://127.0.0.1:8000/check_email?email=${user_email}`
        );
        const data = await fetchResponse.json();
        console.log(data.email_exists);

        if (data.email_exists) {
          setEmailExists("Email already exists");
        } else {
          submitRegistration(event);
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    } else {
      console.log("Invalid password");
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-2 mr-2 ">
        <button onClick={closeModal}>
          <img src={cancelIcon} alt="cross" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-4xl modal-heading text-center full">
            Sign Up Now!
          </h2>
          <p className="text-center full">
            Access personalized healthcare services
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 j">
          <TextField
            id="FormBasicEmail"
            label="Email"
            variant="outlined"
            value={user_email}
            onChange={(event) => {
              setUserEmail(event.target.value);
              setEmailExists("");
              email.current = event.target.value;
            }}
            color="success"
            required
          />
          <p
            className="text-gray-500 font-medium text-red-500"
            style={{ fontSize: "12px", width: "280px", textAlign: "center" }}
          >
            {emailExists}
          </p>

          <TextField
            id="formBasicUsername"
            label="Username"
            variant="outlined"
            value={user_username}
            onChange={(event) => {
              setUserUsername(event.target.value);
              username.current = event.target.value;
            }}
            color="success"
            required
          />
          <TextField
            id="formBasicPassword"
            label="Password"
            variant="outlined"
            value={user_password}
            onChange={(event) => {
              setUserPassword(event.target.value);
              password.current = event.target.value;
            }}
            color={isPasswordValid(user_password) ? "success" : "error"}
            type="password"
            required
          />
          {!isPasswordValid(user_password) && (
            <p
              className="text-gray-500 font-medium"
              style={{ fontSize: "12px", width: "280px", textAlign: "center" }}
            >
              Password must be at least 8 characters long, contain at least 1
              letter, 1 digit, and 1 special character.
            </p>
          )}
          <Button variant="outlined" color="primary" type="submit">
            Submit
          </Button>
          <SignIn />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

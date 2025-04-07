import React, { useState } from "react";
import Navbar from "./Navbar";

interface Props {
  handleAlert: () => void;
}

function SignUpPage({ handleAlert }: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const backgroundHeader = {
    backgroundColor: "#7b4f2c",
  };
  const backgroundMid = {
    backgroundColor: "#f9e6d1",
  };
  const backgroundBottom = {
    backgroundColor: "#8b5e3c",
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);

    try {
      fetch("https://localhost:7174/api/users/register", {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (res.status == 200) {
          handleAlert();
        } else {
          console.log(res.status);
        }
      });
    } catch (error) {
      console.error("Błąd połączenia z API:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container min-vh-100 w-50 d-flex justify-content-center align-items-center">
        <div
          className="card form-card "
          style={{
            width: "50%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              className="text-center card-header text-white"
              style={backgroundHeader}
            >
              <h2>Sign up</h2>
            </div>
            <div className="card-body" style={backgroundMid}>
              <div className="mb-3">
                <label htmlFor="inputUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  E-mail
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type={isChecked ? "text" : "password"}
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPassword"
                  checked={isChecked}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="showPassword">
                  Show password
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="card-footer text-white" style={backgroundBottom}>
              <p style={{ textAlign: "center" }}>
                You have an account? <a href="/index">Sign in!</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

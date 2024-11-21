import React, { useState } from "react";

interface Props {
  handleSetLogged: (current: boolean) => void;
}

function LoginPage({ handleSetLogged }: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      fetch("https://localhost:7174/api/users/login", {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (res.status == 200) {
          res.json().then((json) => {
            console.log(json);
            const setCookie = (name: string, value: string, days: number) => {
              const expirationDate = new Date();
              expirationDate.setDate(expirationDate.getDate() + days);

              document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
            };
            setCookie("usernameForPapierowyRPG", json["username"], 1);
            handleSetLogged(true);
          });
        } else {
          console.log(res.status);
          handleSetLogged(false);
        }
      });
      //.then((json) => console.log(json["email"])); //console.log(res.status)); DON'T DELETE I MIGHT NEED IT
    } catch (error) {
      console.error("Błąd połączenia z API:", error);
    }
  };

  return (
    <div>
      <style>
        {`
          .form-card {
            transition: transform 0.6s ease-in-out, border-color 0.6s ease-in-out;
          }

          .form-card:hover {
            transform: scale(1.05);
            border-color: #007bff;
          }
      `}
      </style>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div
          className="card form-card shadow"
          style={{
            width: "29%",
            border: "4px solid #ccc",
            borderRadius: "15px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="text-center card-header">
              <h2>Log in</h2>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="inputUsername" className="form-label">
                  Username:
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
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password:
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
            <div className="card-footer text-body-secondary">
              <p style={{ textAlign: "center" }}>
                First time? <a href="/signup">Sign up!</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

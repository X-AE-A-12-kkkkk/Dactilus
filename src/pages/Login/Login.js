import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";
import { Alert, CircularProgress } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { signUpWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signUpWithGoogle();
      navigate("/");
    } catch {
      setError("Algum erro aconteceu.");
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("E-mail ou senha incorreta");
      setLoading(false);
    }
  };

  const signInWithX = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setError("Não foi possível logar com X.");
      });
  };
  return (
    <div className="container-fluid text-center fundo-login">
      <div className="row justify-content-between">
        <div className="col-12 p-2">
          <p className="text-center mt-4">Projeto Dactilus</p>
        </div>
        <div className="col-3">
          <p className="texto cima">Não possui conta?</p>
          <p className="texto baixo">Clique aqui e cadastre-se agora</p>
          <Link to="/registro" type="button" className="btn btn-outline-light">
            Cadastre-se
          </Link>
        </div>
        <div className="col-5">
          <p className="naosei">Login</p>
          <form onSubmit={handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
              />
              {loading && <CircularProgress />}
            </div>

            <button
              type="submit"
              className="btn btn-primary mb-3"
              disabled={email === "" || password === "" || loading}
            >
              ENTRAR
            </button>
            <p className="mb-3">ou</p>
          </form>
          <button
            className="btn btn-outline-primary"
            onClick={handleGoogle}
          ></button>
          <button className="btn btn-primary-x" onClick={signInWithX}>Logar com X</button>
        </div>
      </div>
    </div>
  );
}

export default Login;

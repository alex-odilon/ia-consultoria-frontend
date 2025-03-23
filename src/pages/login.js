import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password
      });
      localStorage.setItem("token", response.data.access_token);
      navigate("/chat");
    } catch (err) {
      setErro("Credenciais inválidas.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
          Entrar
        </button>
      </form>
      {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}
      <p style={{ marginTop: "1rem" }}>
        <a href="/register">Cadastrar</a> |{" "}
        <a href="/reset-password">Esqueci minha senha</a>
      </p>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState(null);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleBuscarPergunta = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const response = await axios.post("http://localhost:8000/reset-password", {
        username,
      });
      setQuestion(response.data.question);
      // Redireciona para a tela de confirmação com username e question na rota
      navigate("/reset-password/confirm", { state: { username, question: response.data.question } });
    } catch (err) {
      setErro("Usuário não encontrado.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Recuperar senha</h2>
      <form onSubmit={handleBuscarPergunta}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
          Buscar pergunta
        </button>
      </form>
      {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}
      <p style={{ marginTop: "1rem" }}>
        <a href="/">Voltar para o login</a>
      </p>
    </div>
  );
}

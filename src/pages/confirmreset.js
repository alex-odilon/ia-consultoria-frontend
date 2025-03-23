import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConfirmReset() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = location.state?.username;
  const question = location.state?.question;

  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      await axios.post("http://localhost:8000/reset-password/confirm", {
        username,
        security_answer: answer,
        new_password: newPassword
      });
      setSucesso("Senha atualizada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setErro("Resposta incorreta ou erro na atualização.");
    }
  };

  if (!username || !question) {
    return (
      <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
        <p>Informações ausentes. Volte para a tela de recuperação de senha.</p>
        <a href="/reset-password">Voltar</a>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Redefinir senha</h2>
      <p><strong>Pergunta:</strong> {question}</p>
      <form onSubmit={handleReset}>
        <input
          type="text"
          placeholder="Resposta"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
          Atualizar senha
        </button>
      </form>
      {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green", marginTop: "1rem" }}>{sucesso}</p>}
    </div>
  );
}

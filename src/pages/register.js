import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    try {
      await axios.post("http://localhost:8000/register", {
        username,
        password,
        security_question: question,
        security_answer: answer
      });
      setSucesso("Cadastro realizado com sucesso! Você será redirecionado.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setErro("Erro ao cadastrar usuário. Verifique os dados.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Pergunta de segurança"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Resposta da pergunta"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
          Cadastrar
        </button>
      </form>
      {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green", marginTop: "1rem" }}>{sucesso}</p>}
      <p style={{ marginTop: "1rem" }}>
        <a href="/">Voltar para o login</a>
      </p>
    </div>
  );
}

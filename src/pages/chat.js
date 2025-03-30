import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Chat() {
  const [pergunta, setPergunta] = useState("");
  const [historico, setHistorico] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!pergunta.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:8000/consultar",
        { pergunta },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const novaEntrada = {
        pergunta,
        resposta: res.data
      };
      setHistorico((prev) => [...prev, novaEntrada]);
      setPergunta("");
    } catch (err) {
      const novaEntrada = {
        pergunta,
        resposta: { erro: "Erro ao consultar." }
      };
      setHistorico((prev) => [...prev, novaEntrada]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderResposta = (resposta) => {
    if (typeof resposta === "string") {
      return (
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: 0 }}>
          {resposta}
        </pre>
      );
    }
  
    if (typeof resposta === "object" && resposta !== null) {
      return Object.entries(resposta).map(([chave, valor], idx) => (
        <div key={idx} style={{ marginBottom: "0.5rem" }}>
          <strong>{chave}:</strong>{" "}
          {Array.isArray(valor) ? (
            <ul style={{ margin: 0, paddingLeft: "1rem" }}>
              {valor.map((linha, i) => (
                <li key={i}>{linha}</li>
              ))}
            </ul>
          ) : chave === "grafana_link" && typeof valor === "string" ? (
            <a
              href={valor}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              Clique aqui para ver no Grafana
            </a>
          ) : (
            <span>{String(valor)}</span>
          )}
        </div>
      ));
    }
  
    return <pre>{String(resposta)}</pre>;
  };  

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial",
        overflowX: "hidden"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2>IA Interna</h2>
        <button onClick={handleLogout}>Sair</button>
      </div>

      <form onSubmit={handleEnviar} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          style={{ width: "80%", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: "1rem" }}>
          Enviar
        </button>
      </form>

      <div style={{ borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
        {historico.map((item, index) => (
          <div key={index} style={{ marginBottom: "2rem" }}>
            <p><strong>Pergunta:</strong> {item.pergunta}</p>
            <p><strong>Resposta:</strong></p>
            <div style={{ background: "#f6f6f6", padding: "1rem", borderRadius: "4px" }}>
              {renderResposta(item.resposta)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

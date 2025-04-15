import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CadastroPage: React.FC = () => {
  const [name, setName] = useState<string>(""); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    
    if (password !== confirmPassword) {
      setError("As senhas não correspondem.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/auth/register", {
        nome: name, 
        email,
        senha: password,
      });

      setSuccess("Usuário cadastrado com sucesso!");
      setTimeout(() => navigate("/"), 2000); 
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro ao cadastrar usuário. Tente novamente.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <form
        onSubmit={handleCadastro}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxSizing: "border-box",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#636364", fontFamily: "inter" }}>Preencha seus dados abaixo</h2>
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: "green", marginBottom: "10px" }}>
            {success}
          </div>
        )}

       
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontFamily: "inter" }}>
            Nome:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Digite o seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

     
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontFamily: "inter" }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Digite o seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

     
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontFamily: "inter" }}>
            Senha:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Digite o seu password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "5px", fontFamily: "inter" }}>
            Confirmar Senha:
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirme seu password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroPage;

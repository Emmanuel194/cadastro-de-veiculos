import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        senha: password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro ao fazer login. Tente novamente.");
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
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxSizing: "border-box",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <img
          src="epta.png"
          alt="Logo"
          style={{ width: "157px", marginBottom: "10px" }}
        />
        <p style={{ marginBottom: "20px", fontSize: "15px", color: "#636364", fontFamily: "inter" }}>
          Bem-vindo de volta! Insira seus dados.
        </p>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "flex", marginBottom: "5px", fontFamily: "inter" }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Digite o seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password" style={{ display: "flex", marginBottom: "5px", fontFamily: "inter" }}>
            Senha:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "12px",
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
            backgroundColor: "#007AFF",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          Entrar
        </button>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Não tem uma conta?{" "}
          <a
            href="/cadastro"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Cadastre-se gratuitamente
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

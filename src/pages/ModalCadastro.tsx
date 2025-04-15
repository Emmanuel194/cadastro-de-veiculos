import React from "react";

interface ModalCadastroProps {
  onClose: () => void;
  onSubmit: (nome: string, placa: string) => void;
}

const ModalCadastro: React.FC<ModalCadastroProps> = ({ onClose, onSubmit }) => {
  const [veiculoNome, setVeiculoNome] = React.useState("");
  const [veiculoPlaca, setVeiculoPlaca] = React.useState("");

  const handleSubmit = () => {
    onSubmit(veiculoNome, veiculoPlaca);
    setVeiculoNome("");
    setVeiculoPlaca("");
    onClose();
  };

  return (
    <div
      onClick={onClose} 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        style={{
          width: "430px",
          height: "310px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          zIndex: 1000,
          fontFamily: "inter",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            justifyContent: "center",
          }}
        >
          <img
            src="car.svg"
            alt="car"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <h2 style={{ fontSize: "20px", margin: 0 }}>Cadastrar Novo Veículo</h2>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="veiculoNome"
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              color: "#333",
            }}
          >
            Nome do Veículo
          </label>
          <input
            type="text"
            id="veiculoNome"
            value={veiculoNome}
            onChange={(e) => setVeiculoNome(e.target.value)}
            placeholder="Digite o nome do veículo"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="veiculoPlaca"
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              color: "#333",
            }}
          >
            Placa do Veículo
          </label>
          <input
            type="text"
            id="veiculoPlaca"
            value={veiculoPlaca}
            onChange={(e) => setVeiculoPlaca(e.target.value)}
            placeholder="Digite a placa do veículo"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "14px",
            }}
          />
        </div>

        <button
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={handleSubmit}
        >
          Criar Veículo
        </button>
      </div>
    </div>
  );
};

export default ModalCadastro;

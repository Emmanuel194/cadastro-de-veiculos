import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalCadastro from "./ModalCadastro"; 


const DashboardPage: React.FC = () => {
  const [userName, setUserName] = useState<string>(""); 
  const [totalVeiculos, setTotalVeiculos] = useState<number>(0);
  const [totalAtivos, setTotalAtivos] = useState<number>(0);
  const [totalInativos, setTotalInativos] = useState<number>(0);
  const [veiculos, setVeiculos] = useState<any[]>([]); 
  const [showModal, setShowModal] = useState<boolean>(false);


  useEffect(() => {
  const getUserName = () => {
    const storedUser = localStorage.getItem("userName") || "Usuário";
    setUserName(storedUser);
  };

  const getVehicleData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/vehicles");
      const vehicles = response.data;

      
      console.log("Dados recebidos:", vehicles);

      setVeiculos(vehicles); 
      setTotalVeiculos(vehicles.length); 

      
      setTotalAtivos(vehicles.filter((v: any) => v.status === "Ativo").length);
      setTotalInativos(vehicles.filter((v: any) => v.status === "Inativo").length);

      
      console.log("Ativos:", vehicles.filter((v: any) => v.status === "Ativo").length);
      console.log("Inativos:", vehicles.filter((v: any) => v.status === "Inativo").length);
    } catch (error) {
      console.error("Erro ao buscar dados dos veículos:", error);
    }
  };

  getUserName();
  getVehicleData();
}, []);


  

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "200px",
          backgroundColor: "#FFFFFF",
          color: "#2B3A4B",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "inter",
        }}
      >
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <img src="epta.png" alt="Logo" style={{ maxWidth: "157px" }} />
        </div>

        <h3
          style={{
            marginBottom: "10px",
            fontSize: "17px",
            color: "#2B3A4B",
            fontWeight: "bold",
            fontFamily: "inter"
          }}
        >
          Navegação
        </h3>

        <nav>
          <ul style={{ listStyleType: "none", padding: "0", textAlign: "left", width: "100%" }}>
            <li style={{ marginBottom: "15px" }}>
              <a
                href="/dashboard"
                style={{
                  color: "#2B3A4B",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#007AFF";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "#2B3A4B";
                }}
              >
                 <img
                  src="dashboard.png"
                  alt="Dashboard Icon"
                  style={{ width: "20px", height: "20px" }}
                />
                Dashboard
              </a>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <a
                href="#"
                style={{
                  color: "#2B3A4B",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#007AFF";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "#2B3A4B";
                }}
              >
                 <img
                  src="relatorio.png"
                  alt="relatorio Icon"
                  style={{ width: "20px", height: "20px" }}
                />
                Relatórios
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa" }}>
        <header>
          <h1>Olá, {userName}!</h1>
          <p>Cadastre e gerencie seus veículos:</p>
        </header>
        <section
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#1B2559",
            }}
          >
             <img
                  src="total.png"
                  alt="total Icon"
                  style={{ width: "65px", height: "65px" }}
                />
            <div>
              <h3 style={{ margin: 0, color: "#A3AED0", fontFamily: "inter", fontSize: "16px" }}>Total</h3>
              <p style={{ fontSize: "36px", fontWeight: "bold", margin: 0 }}>{totalVeiculos}</p>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#1B2559",
            }}
          >
             <img
                  src="ativos.png"
                  alt="ativos Icon"
                  style={{ width: "65px", height: "65px" }}
                />
            <div>
              <h3 style={{ margin: 0, color: "#A3AED0", fontFamily: "inter", fontSize: "16px" }}>Ativos</h3>
              <p style={{ fontSize: "36px", fontWeight: "bold", margin: 0 }}>{totalAtivos}</p> 
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#1B2559",
            }}
          >
             <img
                  src="inativos.png"
                  alt="inativos Icon"
                  style={{ width: "65px", height: "65px" }}
                />
            <div>
              <h3 style={{ margin: 0, color: "#A3AED0", fontFamily: "inter", fontSize: "16px" }}>Inativos</h3>
              <p style={{ fontSize: "36px", fontWeight: "bold", margin: 0 }}>{totalInativos}</p>
            </div>
          </div>
        </section>     
<button
  style={{
    padding: "7px 18px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "27px",
    cursor: "pointer",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
  onClick={() => setShowModal(true)} 
>
  <img
    src="adicionarBotao.png" 
    alt="Adicionar"
    style={{ width: "24px", height: "24px" }} 
  />
  Cadastrar Veículo
</button>
{showModal && (
  <ModalCadastro
    onClose={() => setShowModal(false)}
    onSubmit={(nome, placa) => {
  axios
    .post("http://localhost:3000/vehicles", { name: nome, plate: placa })
    .then(() => {
      alert("Veículo cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao cadastrar veículo:", error.response?.data || error.message);
      alert("Erro ao cadastrar o veículo. Tente novamente.");
    });
}}
  />
)}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "10px", fontFamily: "inter", color: "#2B3A4B" }}>Nome do Veículo</th>
              <th style={{ border: "1px solid #ccc", padding: "10px", fontFamily: "inter", color: "#2B3A4B"  }}>Placa</th>
              <th style={{ border: "1px solid #ccc", padding: "10px", fontFamily: "inter", color: "#2B3A4B" }}>Status</th>
              <th style={{ border: "1px solid #ccc", padding: "10px", fontFamily: "inter", color: "#2B3A4B" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculo) => (
              <tr key={veiculo.id}>
  <td style={{ border: "1px solid #ccc", padding: "10px", fontFamily: "inter", fontSize: "14px" }}>{veiculo.name}</td>
  <td style={{ border: "1px solid #ccc", padding: "10px", fontFamily: "inter" }}>{veiculo.plate}</td>
  <td style={{ border: "1px solid #ccc", padding: "10px", fontFamily: "inter" }}>
  {veiculo.status}
</td>
  <td style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
    <button
      style={{
        marginRight: "5px",
        background: "none",
        border: "none",
        cursor: "pointer",
      }}
      title="Editar" 
    >
      <img
        src="editar.svg" 
        alt="Editar"
        style={{ width: "16px", height: "16px" }}
      />
    </button>

  
    <button
  style={{
    marginRight: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
  }}
  title="Arquivar" 
  onClick={() => {
    axios
      .patch(`http://localhost:3000/vehicles/${veiculo.id}/archive`)
      .then(() => {
        alert("Veículo arquivado com sucesso!");
        
        setVeiculos((prevVeiculos) =>
          prevVeiculos.map((v) =>
            v.id === veiculo.id ? { ...v, status: "Inativo" } : v
          )
        );
      })
      .catch((error) => {
        console.error("Erro ao arquivar o veículo:", error.response?.data || error.message);
        alert("Erro ao arquivar o veículo.");
      });
  }}
>
  <img
    src="arquivar.svg"
    alt="Arquivar"
    style={{ width: "16px", height: "16px" }}
  />
</button>


    <button
  style={{
    marginRight: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
  }}
  title="Excluir"
  onClick={() => {
    if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
      axios
        .delete(`http://localhost:3000/vehicles/${veiculo.id}`)
        .then(() => {
          alert("Veículo excluído com sucesso!");
         
          setVeiculos((prevVeiculos) => prevVeiculos.filter((v) => v.id !== veiculo.id));
        })
        .catch((error) => {
          console.error("Erro ao excluir o veículo:", error.response?.data || error.message);
          alert("Erro ao excluir o veículo.");
        });
    }
  }}
>
  <img
    src="excluir.svg"
    alt="Excluir"
    style={{ width: "16px", height: "16px" }}
  />
</button>
  </td>
</tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default DashboardPage;

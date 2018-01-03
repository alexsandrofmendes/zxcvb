import React from "react";
import logo from "../logo.svg";

import FormAddMaquina from "./FormAddMaquina";

class Maquinas extends React.Component {
  constructor() {
    super();
    this.renderMaquinas = this.renderMaquinas.bind(this);
    this.renderSetor = this.renderSetor.bind(this);
    this.manipulaAlteracoes = this.manipulaAlteracoes.bind(this);
  }

  manipulaAlteracoes(e, key) {
    const maquinas = { ...this.props.maquinas };
    const updatedMaquina = {
      ...maquinas[key],
      [e.target.name]: e.target.value
    };

    this.props.updateMaquina(key, updatedMaquina);
  }

  renderMaquinas(key) {
    const maquina = this.props.maquinas[key];
    return (
      <div className="edit" key={key}>
        <input
          onChange={e => this.manipulaAlteracoes(e, key)}
          className="small"
          type="text"
          name="codigo"
          value={maquina.codigo}
        />
        <input
          onChange={e => this.manipulaAlteracoes(e, key)}
          className="large"
          type="text"
          name="nome"
          value={maquina.nome}
        />
        <select
          onChange={e => this.manipulaAlteracoes(e, key)}
          className="medium"
          name="setor"
          value={maquina.setor}
        >
          {Object.keys(this.props.setores).map(this.renderSetor)}
        </select>
        <button onClick={e => this.props.removeMaquina(key)} className="remove">
          &#x2716;
        </button>
      </div>
    );
  }

  renderSetor(key) {
    const setor = this.props.setores[key];

    return (
      <option key={key} value={key}>
        {setor.codigo} - {setor.nome}
      </option>
    );
  }

  render() {
    return (
      <div className="panel">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Máquinas</h1>
        </header>
        {Object.keys(this.props.maquinas).map(this.renderMaquinas)}
        <FormAddMaquina
          addMaquina={this.props.addMaquina}
          setores={this.props.setores}
        />
      </div>
    );
  }
}

export default Maquinas;

import React from "react";
import logo from "../logo.svg";
import FormAddSetor from "./FormAddSetor";

class Setores extends React.Component {
  constructor() {
    super();
    this.renderSetores = this.renderSetores.bind(this);
    this.manipulaAlteracoes = this.manipulaAlteracoes.bind(this);
  }

  manipulaAlteracoes(e, key) {
    const setores = { ...this.props.setores };
    const updatedSetor = {
      ...setores[key],
      [e.target.name]: e.target.value
    };

    this.props.updateSetor(key, updatedSetor);
  }

  renderSetores(key) {
    const setor = this.props.setores[key];
    return (
      <div className="edit" key={key}>
        <input
          onChange={e => this.manipulaAlteracoes(e, key)}
          className="small"
          type="text"
          name="codigo"
          value={setor.codigo}
        />
        <input
          onChange={e => this.manipulaAlteracoes(e, key)}
          className="large"
          type="text"
          name="nome"
          value={setor.nome}
        />
        <button onClick={e => this.props.removeSetor(key)} className="remove">
          &#x2716;
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="panel">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Setores</h1>
        </header>
        {Object.keys(this.props.setores).map(this.renderSetores)}

        <FormAddSetor addSetor={this.props.addSetor} />
      </div>
    );
  }
}

export default Setores;

import React from "react";
import logo from "../logo.svg";
import FormAddPedido from "./FormAddPedido";

class Pedidos extends React.Component {
  constructor() {
    super();
    this.renderPedidos = this.renderPedidos.bind(this);
    this.renderProduto = this.renderProduto.bind(this);
    this.manipulaAlteracoes = this.manipulaAlteracoes.bind(this);
  }

  manipulaAlteracoes(e, key) {
    const pedidos = { ...this.props.pedidos };
    const updatedPedido = {
      ...pedidos[key],
      [e.target.name]: e.target.value
    };

    this.props.updatePedido(key, updatedPedido);
  }

  renderProduto(key) {
    const produto = this.props.produtos[key];

    return (
      <option key={key} value={key}>
        {produto.codigo} - {produto.nome}
      </option>
    );
  }

  renderPedidos(key) {
    const pedido = this.props.pedidos[key];
    const produto = this.props.produtos[pedido.produto];
    return (
      <div className="edit" key={key}>
        <input
          onChange={e => this.manipulaAlteracoes(e, key)}
          className="small"
          type="text"
          name="codigo"
          value={pedido.codigo}
        />
        <select
          onChange={e => this.manipulaAlteracoes(e, key)}
          className="large"
          name="produto"
          value={pedido.produto}
        >
          {Object.keys(this.props.produtos).map(this.renderProduto)}
        </select>
        <input
          onChange={e => this.manipulaAlteracoes(e, key)}
          className="small"
          type="number"
          name="quantidade"
          value={pedido.quantidade}
        />
      </div>
    
    );
  }

  render() {
    return (
      <div className="panel">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pedidos</h1>
        </header>
        
        {Object.keys(this.props.pedidos).map(this.renderPedidos)}
        
        <FormAddPedido
          addPedido={this.props.addPedido}
          produtos={this.props.produtos}
        />
      </div>
    );
  }
}

export default Pedidos;

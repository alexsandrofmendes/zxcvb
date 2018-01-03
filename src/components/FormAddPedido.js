import React from "react";

class FormAddPedido extends React.Component {
  constructor() {
    super();
    this.renderProduto = this.renderProduto.bind(this);
  }

  createPedido(e) {
    e.preventDefault();
    const pedido = {
      codigo: this.codigoInput.value,
      produto: this.produtoInput.value,
      quantidade: this.quantidadeInput.value
    };

    this.props.addPedido(pedido);
    this.formPedido.reset();
  }

  renderProduto(key) {
    const produto = this.props.produtos[key];

    return (
      <option key={key} value={key}>
        {produto.codigo} - {produto.nome}
      </option>
    );
  }

  render() {
    return (
      <form
        ref={form => (this.formPedido = form)}
        className="edit"
        onSubmit={e => this.createPedido(e)}
      >
        <input
          ref={input => (this.codigoInput = input)}
          type="text"
          className="small"
          name="codigo"
          placeholder="Código do pedido"
        />
        <select
          ref={input => (this.produtoInput = input)}
          className="large"
          name="produto"
        >
          {Object.keys(this.props.produtos).map(this.renderProduto)}
        </select>
        <input
          ref={input => (this.quantidadeInput = input)}
          type="number"
          className="small"
          name="quantidade"
          placeholder="Quantidade"
        />

        <button className="main" type="submit">
          Salvar
        </button>
      </form>
    );
  }
}

export default FormAddPedido;

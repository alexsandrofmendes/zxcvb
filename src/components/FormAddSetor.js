import React from "react";

class FormAddSetor extends React.Component {
  createSetor(e) {
    e.preventDefault();
    const setor = {
      codigo: this.codigoInput.value,
      nome: this.nomeInput.value
    };

    this.props.addSetor(setor);
    this.formSetor.reset();
  }

  render() {
    return (
      <form
        ref={form => (this.formSetor = form)}
        className="edit"
        onSubmit={e => this.createSetor(e)}
      >
        <input
          ref={input => (this.codigoInput = input)}
          type="text"
          className="small"
          name="codigo"
          placeholder="Código do setor"
        />
        <input
          ref={input => (this.nomeInput = input)}
          type="text"
          className="large"
          name="nome"
          placeholder="Nome do setor"
        />
        <button className="main" type="submit">
          Salvar
        </button>
      </form>
    );
  }
}

export default FormAddSetor;

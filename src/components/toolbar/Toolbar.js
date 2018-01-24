import React from 'react';

import './Toolbar.css';

const toolbar = (props) => {
  return (
    <header className="Toolbar">
      <div>MENU</div>
      <nav>
        <button name="btnSetores" onClick={props.onClickSetores}>Setores</button>
        <button name="btnMaquinas" onClick={props.onClickMaquinas}>Máquinas</button>
        <button name="btnProdutos" onClick={props.onClickProdutos}>Produtos</button>
        <button name="btnPedidos" onClick={props.onClickPedidos}>Pedidos</button>
      </nav>
    </header>
  );
}

export default toolbar;
import React, { Component } from "react";
import "../App.css";
import base from "../base";
import Firebase from "firebase";
import Setores from "./Setores";
import Maquinas from "./Maquinas";
import Produtos from "./Produtos";
import Pedidos from "./Pedidos";
import Calendar from './calendar/calendar';
import OrderArea from './ordersArea/OrderArea';
import Toolbar from './toolbar/Toolbar';
import Aux from './hoc/Auxliar';
import Modal from './UI/Modal/Modal';

class App extends Component {
  constructor() {
    super();
    this.addSetor = this.addSetor.bind(this);
    this.updateSetor = this.updateSetor.bind(this);
    this.removeSetor = this.removeSetor.bind(this);
    this.addMaquina = this.addMaquina.bind(this);
    this.updateMaquina = this.updateMaquina.bind(this);
    this.removeMaquina = this.removeMaquina.bind(this);
    this.addProduto = this.addProduto.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
    this.addPedido = this.addPedido.bind(this);
    this.updatePedido = this.updatePedido.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.autenticar = this.autenticar.bind(this);
    this.state = {
      setores: [],
      maquinas: [],
      produtos: [],
      pedidos: [],
      owners: [],
      githubMail: null
    };
  }

  componentWillMount() {
    this.refSetores = base.syncState("setores", {
      context: this,
      state: "setores"
    });
    this.refMaquinas = base.syncState("maquinas", {
      context: this,
      state: "maquinas"
    });
    this.refProdutos = base.syncState("produtos", {
      context: this,
      state: "produtos"
    });
    this.refPedidos = base.syncState("pedidos", {
      context: this,
      state: "pedidos"
    });
    this.refOwners = base.syncState("owners", {
      context: this,
      state: "owners"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.refSetores);
    base.removeBinding(this.refMaquinas);
    base.removeBinding(this.refProdutos);
    base.removeBinding(this.refPedidos);
    base.removeBinding(this.refOwners);
  }

  addSetor(setor) {
    const setores = { ...this.state.setores };
    const timestamp = Date.now();

    setores[`setor-${timestamp}`] = setor;

    this.setState({
      setores
    });
  }

  updateSetor(key, setor) {
    const setores = { ...this.state.setores };
    setores[key] = setor;
    this.setState({
      setores
    });
  }

  removeSetor(key) {
    const setores = { ...this.state.setores };
    setores[key] = null;
    this.setState({
      setores
    });
  }

  addMaquina(maquina) {
    const maquinas = { ...this.state.maquinas };
    const timestamp = Date.now();

    maquinas[`maquina-${timestamp}`] = maquina;

    this.setState({
      maquinas
    });
  }

  updateMaquina(key, maquina) {
    const maquinas = { ...this.state.maquinas };
    maquinas[key] = maquina;
    this.setState({
      maquinas
    });
  }

  removeMaquina(key) {
    const maquinas = { ...this.state.maquinas };
    maquinas[key] = null;
    this.setState({
      maquinas
    });
  }

  addProduto(produto) {
    const produtos = { ...this.state.produtos };
    const timestamp = Date.now();

    produtos[`produto-${timestamp}`] = produto;

    this.setState({
      produtos
    });
  }

  updateProduto(key, produto) {
    const produtos = { ...this.state.produtos };
    produtos[key] = produto;
    this.setState({
      produtos
    });
  }

  addPedido(pedido) {
    const pedidos = { ...this.state.pedidos };
    const timestamp = Date.now();

    pedidos[`pedido-${timestamp}`] = pedido;

    this.setState({
      pedidos
    });
  }

  updatePedido(key, pedido) {
    const pedidos = { ...this.state.pedidos };
    pedidos[key] = pedido;
    this.setState({
      pedidos
    });
  }

  showModalHandler = (e) => {
    switch (e.target.name) {
      case ('btnSetores'):
        this.setState({ showSetores: true });
        break;
      case ('btnMaquinas'):
        this.setState({ showMaquinas: true });
        break;
      case ('btnProdutos'):
        this.setState({ showProdutos: true });
        break;
      case ('btnPedidos'):
        this.setState({ showPedidos: true });
        break;
      default:
        break;
    }
  }

  hideModalHandler = () => {
    if (this.state.showSetores) {
      this.setState({ showSetores: false });
    }
    else if (this.state.showMaquinas) {
      this.setState({ showMaquinas: false });
    }
    else if (this.state.showProdutos) {
      this.setState({ showProdutos: false });
    }
    else if (this.state.showPedidos) {
      this.setState({ showPedidos: false });
    }
  }

  renderLogin() {
    return (
      <nav className="login">
        <p>Autentique-se utilizando o Github</p>
        <button onClick={e => this.autenticar()}>Autenticar com Github</button>
      </nav>
    );
  }

  renderModal = () => {
    if (this.state.showSetores) {
      return (
        <Setores 
            setores={this.state.setores}
            updateSetor={this.updateSetor}
            addSetor={this.addSetor}/>
      );
    }
    else if (this.state.showMaquinas) {
      return (
        <Maquinas 
          maquinas={this.state.maquinas}
          addMaquina={this.addMaquina}
          updateMaquina={this.updateMaquina}
          setores={this.state.setores}/>
      );
    }
    else if (this.state.showProdutos) {
      return (
        <Produtos
          updateProduto={this.updateProduto}
          produtos={this.state.produtos}
          addProduto={this.addProduto}
          maquinas={this.state.maquinas}/>
      );
    } else if (this.state.showPedidos) {
      return (
        <div className="Pedidos">
          <Pedidos
            produtos={this.state.produtos}
            pedidos={this.state.pedidos}
            addPedido={this.addPedido}
            updatePedido={this.updatePedido}
          />
        </div>
      );
    }
  }

  renderLoggedUser(){
    const renderOrders = <OrderArea orders={this.state.pedidos} />
    return (
      <div className="App">
        <Modal
          show={this.state.showSetores ||
            this.state.showMaquinas ||
            this.state.showProdutos ||
            this.state.showPedidos}
          modalClosed={this.hideModalHandler}
        >
          {this.renderModal()}
        </Modal>      
        <Calendar 
          className="calendar"
          recursos={this.state.maquinas}
        />
        {renderOrders}
      </div>
    );
  }

  autenticar() {
    var provider = new Firebase.auth.GithubAuthProvider();
    Firebase.auth()
      .signInWithPopup(provider)
      .then(result => {
        var token = result.credential.accessToken;
        var user = result.user;

        this.setState({
          githubMail: user.email
        });

        console.log(token);
        console.log(user.email);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(error);
      });
  }

  render() {
    const isLogged = !this.state.githubMail || !Object.values(this.state.owners).some(item => item === this.state.githubMail)
    
    return (
      <Aux>
        <Toolbar 
          onClickSetores={this.showModalHandler}
          onClickMaquinas={this.showModalHandler}
          onClickProdutos={this.showModalHandler}
          onClickPedidos={this.showModalHandler}
        />
        {isLogged ? this.renderLoggedUser() : this.renderLogin()}
      </Aux>
    )
  }
}

export default App;

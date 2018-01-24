import React from 'react';

import Aux from '../../hoc/Auxliar';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div 
      style={
        {
          transform: props.show ? 'translateY(0)' : 'translateY(-10vh)',
          opacity: props.show ? '1': '0'
        }
      }
      className="Modal">
      {props.children}
    </div>  
  </Aux>
);

export default modal;
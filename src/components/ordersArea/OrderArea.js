import React from 'react';

import './OrderArea.css';

const OrderArea = (props) => {
  const ordersKey = Object.keys(props.orders);
  const items = ordersKey.map(k => {
    const o = props.orders[k];
    return (
      <li className="OrderAreaListItem" key={o.codigo}>
        <span>
          {o.codigo} - {o.produto}
        </span>
      </li>
    )
  });

  return (
    <div className="OrderArea">
      <ul className="OrderAreaList">
        {items}
      </ul>
    </div>
  );
}

export default OrderArea;

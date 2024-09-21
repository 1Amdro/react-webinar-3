import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(
  props = {
    item: {},
    propClick: () => {},
  },
) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title} </div>
      <div className="Item-price">{props.item.price}&nbsp;₽</div>
      {props.item.count && <div className="Item-count">{props.item.count}&nbsp;шт</div>}
      <div className="Item-actions">
        {props.item.count ? (
          <button onClick={() => props.propClick(props.item.code, props.item.price)}>Убрать</button>
        ) : (
          <button onClick={() => props.propClick(props.item.code, props.item.price)}>
            Добавить
          </button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  propClick: PropTypes.func,
};

export default React.memo(Item);

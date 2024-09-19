import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { textForm } from '../../utils';

function Controls({ propClick = () => {}, total = 0, totalPrice = 0 }) {
  return (
    <div className="Controls">
      <div className="Controls-total">
        В корзине:
        <span className="bold">
          {total} {textForm(total)} / {totalPrice} &nbsp;₽
        </span>
      </div>
      <button onClick={propClick}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default React.memo(Controls);

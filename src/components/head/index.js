import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, modal = false, propOnClose = () => {} }) {
  return (
    <>
      {modal ? (
        <div className="Head Head-modal">
          <h1>{title}</h1>
          <button className="btn" onClick={propOnClose}>
            Закрыть
          </button>
        </div>
      ) : (
        <div className="Head">
          <h1>{title}</h1>
        </div>
      )}
    </>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);

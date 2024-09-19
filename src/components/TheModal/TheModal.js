import './style.css';
import { createPortal } from 'react-dom';
import React, { useState } from 'react';
import PageLayout from '../page-layout';
import Head from '../head';
import List from '../list';

function TheModal({ cardList, modalToggle, propRemoveFromCart, totalPrice }) {
  return createPortal(
    <div className="modal">
      <div className="modal-content">
        <PageLayout propClassName="page">
          <Head title="Корзина" modal={true} propOnClose={modalToggle} />
          <List list={cardList} onClickItem={propRemoveFromCart} />
          <div className="wrap">
            <h3>Итого</h3> <h3>{totalPrice}&nbsp;₽</h3>
          </div>
        </PageLayout>
      </div>
    </div>,
    document.body,
  );
}

export default TheModal;

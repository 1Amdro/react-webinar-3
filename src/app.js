import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import TheModal from './components/TheModal/TheModal.js';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cardList = store.getState().shoppingCart;
  const [modal, setModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function modalToggle() {
    setModal(!modal);
  }

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    addToCart: useCallback(
      (code, price) => {
        setTotal(prev => prev + 1);
        setTotalPrice(prev => prev + price);
        store.addToCart(code);
      },
      [store],
    ),
    removeFromCart: useCallback(
      (code, price) => {
        store.removeFromCart(code);
        if (total < 0) return;
        setTotal(prev => prev - 1);
        setTotalPrice(prev => prev - price);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls propClick={modalToggle} total={total} totalPrice={totalPrice} />
      <List list={list} onClickItem={callbacks.addToCart} />
      {modal && (
        <TheModal
          cardList={cardList}
          modalToggle={modalToggle}
          propRemoveFromCart={callbacks.removeFromCart}
          totalPrice={totalPrice}
        />
      )}
    </PageLayout>
  );
}

export default App;

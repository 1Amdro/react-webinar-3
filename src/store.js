/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  generateUniqNum() {
    const randomNum = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    const checkUniqNum = this.state.list.find(item => item.code === randomNum);
    if (checkUniqNum) {
      return this.generateUniqNum();
    } else {
      return randomNum;
    }
  }
  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,

      list: [
        ...this.state.list,
        { code: this.generateUniqNum(), highlighted: 0, title: 'Новая запись' },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }

        if (item.code === code && item.selected === true) {
          item.highlighted = item.highlighted + 1;
        }

        return item;
      }),
    });
  }
}

export default Store;

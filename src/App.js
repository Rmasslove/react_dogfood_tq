import { useEffect, useState } from 'react' // Импорт компонента
import { useQuery } from '@tanstack/react-query' // Импорт компонента
import { Footer } from './components/Footer/Footer' // Импорт компонента
import { Header } from './components/Header/Header' // Импорт компонента
import { Main } from './components/Main/Main' // Импорт компонента
import './App.css' // Импорт компонента стилей
import { Modal } from './components/Modal/Modal' // Импорт компонента
import { Api } from './Api' // Импорт компонента

export const PRODUCTS_QUERY_KEY = 'PRODUCTS_QUERY_KEY' // Постоянный ключ (getGoods)

function App() { // Компотент App
  const [user, setUser] = useState(localStorage.getItem('userSM8')) // Хук (useState) принимающий данные из (localStorage) о пользователе
  const [token, setToken] = useState(localStorage.getItem('tokenSM8')) // Хук (useState) принимающий (token) из (localStorage)
  const [modalActive, setModalActive] = useState(false) // Хук для модального окна, скрыто (false)
  const [api, setApi] = useState(new Api(token)) // Хук для состояния (Api)
  const [dataProducts, setGoods] = useState([]) // Хук для получения инф. о продуктах с сервера
  const [userDetails, setUserDetails] = useState([]) // Хук для получения инф. о юзере с сервера

  const getGoods = () => api.getProducts().then((res) => res.json()) // Вызов функции GET запроса

  const { data } = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: getGoods,
  }) // Метод запроса (useQuery) для (getGoods)

  useEffect(() => { // Хук для получения списка продуктов
    if (data !== undefined) { // Если список не пустой то
      if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
        const strData = JSON.stringify(data.products)
        // Сущность для с товарами для записи в (localStorage)
        localStorage.setItem('localProducts', strData) // Запись в (localStorage)
        setGoods(data.products) // Запись результата в Хук (dataProducts)
      } else {
        // eslint-disable-next-line no-restricted-globals
        location.reload() // Перезагрузка страницы для обхода ошибки (401)
      }
    }
  }, [api]) // Зависимость от действий с (api)

  useEffect(() => { /// / Хук для получения списка продуктов если user уже сохранён
    if (user && data !== undefined) { // Если user есть и список не пустой то
      if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
        const strData = JSON.stringify(data.products)
        // Сущность для с товарами для записи в (localStorage)
        localStorage.setItem('localProducts', strData) // Запись в (localStorage)
        setGoods(data.products) // Запись результата в Хук (dataProducts)
      } else {
        // eslint-disable-next-line no-alert
        alert(data.message) // Вывод информации об ошибке
      }
    }
  }, [data]) // Зависимость от useQuery

  useEffect(() => { // Хук для проверки изменения (token)
    if (!token) { // если токена нет
      localStorage.removeItem('userSM8') // Очистка юзера из (localStorage)
      setUser(null) // Очистка хука с юзером
      localStorage.removeItem('localProducts') // Очистка записи о продуктах из (localStorage)
    } else {
      setApi(new Api(token)) // Запись в Хук (api) новый токен
      setUser(localStorage.getItem('userSM8')) // Обновление в Хук (user) из (localStorage)
    }
  }, [token]) // Срабатывает при изменении (token)

  useEffect(() => { // Хук удаляющий информацию о токене если изменился (user)
    if (!user) { // Если (user) нет
      localStorage.removeItem('tokenSM8') // Очистка токена из (localStorage)
      setToken(null) // Очистка информации о токене в (token)
      localStorage.removeItem('localProducts') // Очистка записи о продуктах из (localStorage)
    }
  }, [user]) // Срабатывает при изменении (user)

  return ( // jsx разметка
    <>
      <div className="containerApp">
        <Header /* Компонент (Header) с пропсами */
          user={user}
          setUser={setUser}
          dataProducts={dataProducts}
          setGoods={setGoods}
          setModalActive={setModalActive}
          setUserDetails={setUserDetails}
          api={api}
          token={token}
        />
        <Main
          user={user}
          dataProducts={dataProducts}
          token={token}
        />
        <Footer /* компонент Footer *//>
      </div>
      <Modal /* компонент Modal с пропсами */
        modalActive={modalActive}
        setModalActive={setModalActive}
        api={api}
        setToken={setToken}
        user={user}
        userDetails={userDetails}
      />
    </>
  )
}

export default App // Экспорт компонента App методом (default)

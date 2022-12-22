import { useQuery } from '@tanstack/react-query' // Импорт компонента
import { useEffect } from 'react' // Импорт компонента
import { Search } from '../Search/search' // Импорт компонента
import stylesHeader from './header.module.scss' // Импорт компонента стилей

export const USERDETAILS_QUERY_KEY = 'USERDETAILS_QUERY_KEY' // Постоянный ключ для (getDetails)

function Header({
  user, setUser, dataProducts, setModalActive, setGoods, setUserDetails, api, token,
}) { // Компонент Header с {props}
  const getDetails = () => api.getUserDetails().then((res) => res.json()) // Вызов GET запроса

  const { data } = useQuery({
    queryKey: [USERDETAILS_QUERY_KEY],
    queryFn: getDetails,
  }) // Метод запроса (useQuery) для (getDetails)

  useEffect(() => { // Хук для получения информации о user
    if (user && token) { // Если user и token есть то
      if (data !== undefined) { // Если информация не undefined
        if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
          setUserDetails(data) // Запись результата в Хук (userDetails)
        }
      }
    }
  }, [data, setModalActive]) // Зависимость от (useQuery) и функции модального окна

  const UserDetails = (e) => { // функция запроса детальной информации о пользователе
    e.preventDefault() // Отмена действий по умолчанию
    if (user && token) { // Если user и token есть то
      if (!data.error && !data.err) { // Проверка на ошибку (если нет - то)
        setModalActive((prev) => !prev) // Смена режима модального окна (откр/закр)
      } else {
      // eslint-disable-next-line no-alert
        alert(data.message) // Вывод информации об ошибке
      }
    }
  }

  const logIn = (e) => { // функция для Логина
    e.preventDefault() // Отмена действий по умолчанию
    setModalActive((prev) => !prev) // Смена режима модального окна (откр/закр)
  }
  const logOut = (e) => { // функция для Выхода
    e.preventDefault() // Отмена действий по умолчанию
    localStorage.removeItem('userSM8') // Удаления записи о пользователе из (localStorage)
    setUser('') // Удаление записи о пользователе в Хук (useState)
  }

  return ( // jsx разметка
    <header className={stylesHeader.header}>
      <a className={stylesHeader.logo} href="_"/* Поле логотипа */>DogFood</a>
      <Search /* Компонент (Search) и передача пропсов */
        setGoods={setGoods}
        dataProducts={dataProducts}
      />
      <nav className={stylesHeader.nav}>
        {(user && token) && (
        <a className={stylesHeader.user} href="_" onClick={UserDetails}>{user}</a>)/* Поле отображающие имя пользователя */}
        {(!user || !token) && <a className={stylesHeader.btn} href="_" onClick={logIn}>Войти</a>/* Поле кнопки войти */}
        {(user && token) && <a className={stylesHeader.btn} href="_" onClick={logOut}>Выйти</a>/* Поле кнопки выйти */}
      </nav>
    </header>
  )
}

export { // экспорт компонента
  Header,
}

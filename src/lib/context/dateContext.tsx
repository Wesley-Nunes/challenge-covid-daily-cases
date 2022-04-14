import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState
} from 'react'
import IDateContext from '../../interfaces/IDataContext'

const defaultState = { date: '2020-05-11' }
const DateContext = createContext<IDateContext>(defaultState)

const DateProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [date, setDate] = useState(defaultState.date)
  const changeDate = (newDate: string) => {
    setDate(newDate)
  }

  return (
    <DateContext.Provider value={{ date, changeDate }}>
      {children}
    </DateContext.Provider>
  )
}

const useDate = () => useContext(DateContext)

export { DateProvider, useDate }

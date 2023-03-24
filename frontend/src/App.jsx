import { useState, useContext, createContext } from 'react'
import './App.css'
import Login from './LoginPage'
import RouteAssingments from './RouteAssignments'
import TeamMembers from './TeamMembers'

export const LoggedInContext = createContext()
export const MembersContext = createContext()
export const SpeedContext = createContext()


function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [members, setMembers] = useState(["", "", "", "", "", "", "", "", "", "",])
  const [currentSpeed, setCurrentSpeed] = useState(["", "", "", "", "", "", "", "", "", "",])

  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <div className='PageControl'>
        {
          loggedIn ?
            <MembersContext.Provider value={[members, setMembers]}>
              <SpeedContext.Provider value={[currentSpeed, setCurrentSpeed]}>
                <div className='RoutePageControl'>
                  <TeamMembers />
                  <RouteAssingments />
                </div>
              </SpeedContext.Provider>
            </MembersContext.Provider>
            :
            <Login />
        }
      </div>
    </LoggedInContext.Provider>
  )
}
export default App

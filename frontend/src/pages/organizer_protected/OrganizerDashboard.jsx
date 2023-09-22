import { React, useContext, useEffect, useState, createContext } from 'react'
import OrganizerInfoCard from '../../components/organizer_protected/OrganizerInfoCard'
import AuthContext from '../../context/AuthContext'
import axiosTokenIntercept from '../../utils/AxiosInterceptor'



const OrganizerDashboard = () => {
  const { logout } = useContext(AuthContext)
  const [concerts, setConcerts] = useState(undefined)
  useEffect(() => {
    let loading = true
    if (loading) {
      axiosTokenIntercept.get(`/api/concert/`)
      .then((result) => {
        setConcerts(result.data)
      })
      .catch((result) => {
        logout()
      })
    }
    return () => {
      loading = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let contextDiary = {
    concerts : concerts,
    setConcerts : setConcerts,
  }

  return (
    <div className='row justify-content-between align-items-start'>
        
        <OrganizerContext.Provider value={contextDiary}>
          <div className='col dashboard-main'>
            <OrganizerInfoCard />
          </div>
        </OrganizerContext.Provider>

    </div>
  )
}


export const OrganizerContext = createContext()
export default OrganizerDashboard


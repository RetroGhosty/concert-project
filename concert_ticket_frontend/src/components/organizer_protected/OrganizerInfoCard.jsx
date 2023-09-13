import {React, useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import { OrganizerContext } from '../../pages/organizer_protected/OrganizerDashboard'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import dayjs from 'dayjs'
import {dateDifference} from '../../utils/DataUtils'


const OrganizerInfo_card = () => {
    const {user} = useContext(AuthContext)
    const organizerCxt = useContext(OrganizerContext)

    const firstLetter = user.username.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = user.username.slice(1)  

    const navigate = useNavigate()

    const returnTotalValue = (ticketArr) => {
      var totalPrice = 0
      for (let index = 0; index < ticketArr.length; index++) {
        totalPrice = totalPrice + ticketArr[index]['price']
      }
      return totalPrice
    }

    const navigateTo = (linkStr, linkID) => {
      navigate(`${linkStr}/edit`)
    }


    if (organizerCxt !== undefined) {
      return (
      <div>
          <div className='row info-card p-4 main-cards rounded'>
            <h3>Welcome {firstLetterCap + remainingLetters}!</h3>
          </div>
          <div className='row justify-content-end'>
            {organizerCxt.map((eachData) => (
              <Card key={eachData.id} onClick={() => {navigateTo(eachData.name, eachData.id)}} className='col-8 p-0 mb-5 user-select-none bg-dark text-light concertCard'>
                <CardActionArea>
                  <CardMedia sx={{height: 300}} image={`http://localhost:8000${eachData.bannerImg}`}/>
                  <CardContent className='p-4 bg-dark text-light'>
                    <div>
                      <div className='row justify-content-between'>
                        <h3 className='fw-bold col'>{eachData['name']}</h3>
                        <span className='col text-end text-secondary'>Created At <div className='fw-bolder text-light'>{dayjs(eachData['createdAt']).format('MMMM DD, YYYY')}</div></span>
                      </div>
                      <div className='row justify-content-between'>
                        <h4 className='col text-info'>{dateDifference(eachData['eventDue'], eachData['createdAt'])}</h4>
                        <h4 className='col text-end fw-lighter'>Ticket collected: {eachData['ticket'].length}</h4>
                      </div>
                      <h4 className='text-end'><span className='bg-success text-black px-3 rounded'>₱ {returnTotalValue(eachData['ticket'])}</span></h4>
                    </div>
                  </CardContent>

                </CardActionArea>
              </Card>
            ))}
          </div>
      </div>
      )
    } else{
      return (
        <div>
          <div className='row info-card p-4 main-cards rounded'>
            <h3>Welcome {firstLetterCap + remainingLetters}!</h3>
          </div>
        </div>
      )
    }
}

export default OrganizerInfo_card
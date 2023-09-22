import {React, useContext, useEffect, useState} from 'react'
import { ImTicket } from 'react-icons/im'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import NotFound from './NotFound'
import { PurpleButton } from '../components/CustomizedMaterials'

import { Card, CardMedia, CardContent } from '@mui/material'
import AuthContext from '../context/AuthContext'
import { apiBaseUrl, apiStaticURL, mediaBaseUrl } from '../utils/APIUtils'


const ConcertGuestView = () => {
  const {user} = useContext(AuthContext)

  const navigate = useNavigate()
  


  let { concertID } = useParams()
  axios.defaults.baseURL = apiBaseUrl

  let [pageResponse, setPageResponse] = useState("Loading....")

  useEffect(() => {
    pgStateDecider(concertID)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concertID])




  const IDUserState = () => {
    if (user === undefined){
      navigate("/login")
    }
  }


  const pgStateDecider = async (params) => {
    try {
      const fetchedData = await axios.get(`/api/get/pub/concert/${params}/`)
      let ConcertData = 
      <div className='row justify-content-between align-items-start'>
        <Card className="col-lg-8 text-light p-0">
          <CardMedia 
          component="img" 
          image={`${mediaBaseUrl}${apiStaticURL}${fetchedData.data['bannerImg']}`}
          height="400"/>
          <CardContent className='m-3'>
            <h1 className='mb-4'>{fetchedData.data['name']}</h1>
            <p>{fetchedData.data['paragraph']}</p>
          </CardContent>
        </Card>

        <div className='col-lg-3 bg-dark text-dark p-0 rounded'>
          <div className='text-light p-4'>
            <h4>Ticket Remaining</h4>
            <h3 className="d-inline pe-2"><ImTicket/></h3>
            <span className='text-info fs-5 fw-semibold'>{fetchedData.data['ticket'].length} / {fetchedData.data['limit']}</span>
            <div className='mt-3'>
              <PurpleButton variant="contained" className='px-4' onClick={IDUserState}>Join concert</PurpleButton>
            </div>
          </div>
        </div>
      </div>

      if (fetchedData.data !== undefined){
        setPageResponse(ConcertData)
      } else{
        setPageResponse(<NotFound/>)
      }
    } catch (error) {
      setPageResponse(<NotFound/>)
 
    }
  }
  return (
    <div>{pageResponse}</div>
  )




}

export default ConcertGuestView

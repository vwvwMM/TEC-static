import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navbar, Footer, Spinner } from '.'
import { freeSet } from '@coreui/icons'
import { CFormSelect, CCol, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getActivities, getParticipants } from '../../utils'
let participants = []
const ParticipantList = () => {
    const { id } = useParams()
    const [activity, setActivity] = useState([])
    const [showParticipants, setShowParticipants] = useState([])
    const [table, setTable] = useState(1)
    const [mode, setMode] = useState(0)
    const [pending, setPending] = useState(true)
    const chooseCSS = (m) => {
        return { backgroundColor: `${mode===m?'#d5b69c':'#f8f9fa'}`, color: `${mode===m?'white':'black'}`}
    }
    const tableOptions = (totalNum) => {
        let opts = []
        for(let tableIdx=0; tableIdx<totalNum; tableIdx++){
            opts.push({value: tableIdx+1, label: `${tableIdx+1}${tableIdx===0?'st':tableIdx===1?'nd':tableIdx===2?'rd':'th'} table`})
        }
        return opts
    }
    const searchParticipant = () => {}
    useEffect(() => {
        setActivity(getActivities().find(activity => activity.id===id))
        participants = getParticipants()
        setPending(false)
    }, [])
    useEffect(() => {
        setShowParticipants(participants.filter(p=>p.table===table))
    }, [table])
  return (
    <div className='container pt-5'>
        {pending?<Spinner/>:
        <>
            <Navbar head='All participants' url="/" icon={freeSet.cilZoom} iconFunc={searchParticipant} />
            <br/>
            <h1 className='my-4'><b>{activity.title}</b></h1>
            <div className='d-flex justify-content-around my-3'>
                <CCol className='py-2 btn mx-2' style={chooseCSS(0)} onClick={e=>setMode(0)}>
                    <h4 className='mb-0'>Info</h4>
                </CCol>
                <CCol className='py-2 btn mx-2' style={chooseCSS(1)} onClick={e=>setMode(1)}>
                    <h4 className='mb-0'>Participants</h4>
                </CCol>
            </div>
        </>}
        {mode?<>
                <CFormSelect className='d-flex justify-content-center rounded py-2 text-center my-4' style={{fontSize:"1.3rem", "backgroundColor":"#dfc7b3"}} onChange={e=>setTable(Number(e.target.value))} >
                    {tableOptions(activity.tableNum).map((option) => 
                            <option value={option.value} className='d-flex justify-content-center bg-light'>{option.label}</option>
                            )}
                </CFormSelect>
                {showParticipants.length>0?showParticipants.map(participant =>
                    <Link to={`/participant/${participant.id}/?aid=${activity.id}`} className='text-decoration-none shadow'>
                        <div className='d-flex justify-content-between align-items-center mx-3 my-4'>
                            <div className='col-3 d-flex justify-content-center align-items-center card'>
                                <img src={participant.img} className='img-fluid rounded card-img' style={{maxHeight: "10rem" }} />
                                <div className='card-img-overlay d-flex justify-content-end align-items-end'>
                                    <CIcon icon={freeSet.cilHeart} className='text-secondary bg-white p-1 rounded' size='xl'/>
                                </div>
                            </div>
                            <div className='col-8'>
                                <h3 className='my-2 text-dark'><b>{participant.name}/{participant.nickname}</b></h3>
                                <h4 className='text-secondary my-2'>
                                    {participant.hashtags.map((hashtag, idx) =>
                                        <span>#{hashtag}</span>
                                    )}
                                </h4>
                                <h4 className='text-secondary my-2'>{participant.organization} {participant.position}</h4>
                            </div>
                        </div>
                    </Link>
                )
                :<h3 className='text-center'>No participants</h3>
                }
            </>
        :<div>
            <h3><b>時間：</b></h3>
            <h4 className='text-dark bg-light p-4'>{activity.time}</h4>
            <h3><b>地點：</b></h3>
            <h4 className='text-dark bg-light p-4'>{activity.address}</h4>
            <h3><b>人數：</b></h3>
            <h4 className='text-dark bg-light p-4'>{participants.length}人</h4>
            <h3><b>活動流程：</b></h3>
            <h4 className='text-dark bg-light p-4'>{activity.flow}</h4>
            <h3><b>注意事項：</b></h3>
            <h4 className='text-dark bg-light p-4'>{activity.notice}</h4>
        </div>}
        <Footer bgColor='light' textColor='secondary' />
    </div>
  )
}

export default ParticipantList
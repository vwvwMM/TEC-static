import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getParticipants } from '../../utils'
import { lineIcon, facebookIcon, instagramIcon, linkedinIcon, youtubeIcon, Spinner } from '.'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { CButton } from '@coreui/react'
const ParticipantDetail = () => {
  const { id: pid } = useParams()
  const [searchParams] = useSearchParams()
  const aid = searchParams.get('aid')
  const [participant, setParticipant] = useState(null)
  const [mode, setMode] = useState('experiences')
  const [pending, setPending] = useState(true)
  const chooseCSS = (m) => {
        return { backgroundColor: `${mode===m?'#d5b69c':'#f8f9fa'}`, color: `${mode===m?'white':'black'}`, border:"none", margin:"0 0.6rem", padding:"0.4rem 2rem", fontSize:"1.2rem" }
    }
  useEffect(() => {
    setParticipant(getParticipants().find(participant => participant.id===pid))
    setPending(false)
  }, [])
  const content = (participant) =>{
    return <div className='card-img-overlay d-flex flex-column align-items-center' style={{backgroundColor:"#d5b69c"}}>
      <Link to={`/activity/${aid}`} className='text-decoration-none align-self-start text-dark m-5'>
          <CIcon icon={freeSet.cilArrowLeft} size="xxl" />
        </Link>
        <img src={participant.img} style={{maxHeight:"25vh", maxWidth:"50vh", zIndex:1, marginBottom:-30}} className='rounded-circle img-fluid bg-white p-4 d-lg-none' />
        <img src={participant.img} style={{maxHeight:"45vh", maxWidth:"50vh", zIndex:1, marginBottom:-30}} className='rounded-circle img-fluid bg-white p-4 d-none d-lg-block' />
        <div className='bg-white p-4 w-100 h-50 d-flex flex-column align-items-center'>   
          <h1 className='text-dark my-4'><b>{participant.name}/{participant.nickname}</b></h1>
          <div className='d-flex flex-around'>
            {participant.links.map(link=>{
              if(link.includes('facebook')) return(<a href={link} className='text-decoration-none text-dark'><img src={facebookIcon} /></a>)
              else if(link.includes('line')) return (<a href={link} className='text-decoration-none text-dark'><img src={lineIcon} /></a>)
              else if(link.includes('instagram')) return (<a href={link} className='text-decoration-none text-dark'><img src={instagramIcon} /></a>)
              else if(link.includes('linkedin')) return (<a href={link} className='text-decoration-none text-dark'><img src={linkedinIcon} /></a>)
              else if(link.includes('youtube')) return (<a href={link} className='text-decoration-none text-dark'><img src={youtubeIcon} /></a>)
            })}
          </div>
          <h3 className='text-secondary my-3'>{participant.organization} {participant.position}</h3>
          {participant.hashtags&&<h4 className='text-secondary text-center px-3'>{
            participant.hashtags.map(h=>`#${h}`)
          }</h4>}
          <br/>
          <div className='d-flex justify-content-around align-items-center'>
            <CButton onClick={e=>setMode('experiences')} style={chooseCSS('experiences')}>經歷</CButton>
            <CButton onClick={e=>setMode('hobbies')} style={chooseCSS('hobbies')}>興趣</CButton>
            <CButton onClick={e=>setMode('strengths')} style={chooseCSS('strengths')}>專長</CButton>
            <CButton onClick={e=>setMode('more')} style={chooseCSS('more')}>還想告訴你</CButton>
          </div>
          <div className='col-12 bg-light rounded p-3 my-4 mx-5'>
            {participant[mode].length>0&&participant[mode].map(p=>(
              <ul className='h3 my-3'>{'\u2022 '+p}</ul>
              ))}
          </div>
        </div>
    </div>
  }
  return (
    pending?<Spinner/>:
    <>
      <div className='d-flex flex-column d-lg-none'>
          {content(participant)}
      </div>
      <div className='d-flex flex-column d-none d-lg-block'>
          {content(participant)}
      </div>
    </>
  )
}

export default ParticipantDetail
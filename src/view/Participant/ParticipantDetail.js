import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getParticipants } from '../../utils'
import { lineIcon, facebookIcon, instagramIcon, linkedinIcon, youtubeIcon, Spinner } from '.'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'
const ParticipantDetail = ({helps, setHelps}) => {
  const { id: pid } = useParams()
  const [searchParams] = useSearchParams()
  const aid = searchParams.get('aid')
  const [participant, setParticipant] = useState(null)
  const [mode, setMode] = useState('experiences')
  const [pending, setPending] = useState(true)
  const [modal, setModal] = useState(false)
  const [lineModal, setLineModal] = useState(false)
  const chooseCSS = (m) => {
        return { backgroundColor: `${mode===m?'#d5b69c':'#f8f9fa'}`, color: `${mode===m?'white':'black'}`, border:"none", margin:"0 0.6rem", padding:"0.4rem 2rem", fontSize:"1.2rem" }
    }
  useEffect(() => {
    setParticipant(getParticipants().find(participant => participant.id===pid))
    setPending(false)
  }, [])
  const content = (participant) =>{
    return <div className='card-img-overlay d-flex flex-column align-items-center' style={{backgroundColor:"#d5b69c"}}>
      <Link to={`/activity/${aid}/?mode=1&table=${participant.table}`} className='text-decoration-none align-self-start text-dark m-5'>
          <CIcon icon={freeSet.cilArrowLeft} size="xxl" />
        </Link>
        <img src={participant.img} style={{ maxHeight:"35vh", maxWidth:'40vh', zIndex:1, marginBottom:-50}} className='bg-white p-4 rounded-circle img-fluid d-lg-none' />
        <img src={participant.img} style={{ maxHeight:"35vh", maxWidth:'40vh', zIndex:1, marginBottom:-50}} className='bg-white p-4 rounded-circle img-fluid d-none d-lg-block' />
        <div className='bg-white p-4 w-100 h-50 d-flex flex-column align-items-center'>   
          <h1 className='text-dark my-4'><b>{participant.name}{participant.nickname&&`/${participant.nickname}`}</b></h1>
          <div className='d-flex flex-around'>
            {participant.links.map(link=>{
              if(link.includes('facebook')) return(<a href={link} target='_blank' rel="noopener noreferrer" className='text-decoration-none text-dark'><img src={facebookIcon} /></a>)
              else if(link.includes('instagram')) return (<a href={link} target='_blank' rel="noopener noreferrer" className='text-decoration-none text-dark'><img src={instagramIcon} /></a>)
              else if(link.includes('linkedin')) return (<a href={link} target='_blank' rel="noopener noreferrer" className='text-decoration-none text-dark'><img src={linkedinIcon} /></a>)
              else if(link.includes('youtube')) return (<a href={link} target='_blank' rel="noopener noreferrer" className='text-decoration-none text-dark'><img src={youtubeIcon} /></a>)
              else {
                if(link.includes('http'))
                  return <a href={link} target='_blank' rel="noopener noreferrer" className='text-decoration-none text-dark'><img src={lineIcon} /></a>
                else
                  return <a onClick={()=>setLineModal(link)} className='text-decoration-none text-dark'><img src={lineIcon} /></a>
              }
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
            <CButton onClick={e=>helps.includes(participant.id)?setMode('help'):setModal(true)} style={chooseCSS('help')}>我可以...</CButton>
          </div>
          <div className='col-12 bg-light rounded p-3 my-4 mx-5'>
            {participant[mode].length>0&&participant[mode].map(p=>(
              p.includes('<br>')?<ul className='h3 my-3'>{'  - '+p.slice(0,-4)}</ul>:<ul className='h3 my-3'>{'\u2022 '+p}</ul>
              ))}
          </div>
        </div>
    </div>
  }
  return (
    pending?<Spinner/>:
    <>
      <CModal
        size="xl"
        visible={lineModal}
        onDismiss={() => setLineModal(false)}
        alignment="center"
      >
        <CModalHeader onDismiss={() => setLineModal(false)}>
          <CModalTitle className='h2'>{participant.name}的line id</CModalTitle>
        </CModalHeader>
        <CModalBody className='h3'>
          {lineModal}
        </CModalBody>
      </CModal>
      <CModal
        size="xl"
        visible={modal}
        onDismiss={() => setModal(false)}
        alignment="center"
      >
        <CModalHeader onDismiss={() => setModal(false)}>
          <CModalTitle className='h2'>觀看{participant.name}的 "我可以..."</CModalTitle>
        </CModalHeader>
        <CModalBody className='h3'>
          {helps.length<3?
          <>
            <p>您最多只能觀看三個人的 "我可以..."，目前您已觀看了{helps.length}個人。</p>
            <p>請問您確定要看<b>{participant.name}</b>的嗎？觀看後不得再後悔喔！</p>
          </>
          :'已達3次的觀看限制！'}
        </CModalBody>
        <CModalFooter>
          {helps.length<4&&<CButton color="secondary" onClick={() => setModal(false)}>
            取消
          </CButton>}
          <CButton color="primary" onClick={() => {
            setModal(false)
            if(helps.length>=3) return
            setHelps([...helps, participant.id])
            setMode('help')
          }}>
            確定
          </CButton>
        </CModalFooter>
      </CModal>
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
import React, { useState, useEffect } from 'react'
import { CCol } from '@coreui/react'
import { freeSet } from '@coreui/icons'
import { Link } from 'react-router-dom'
import { getActivities } from '../../utils'
import { Navbar, Footer, Spinner } from '.'
const Activity = () => {
    const [mode, setMode] = useState(0)
    const [acts, setActs] = useState([])
    const [activities, setActivities] = useState([])
    const [pending, setPending] = useState(true)
    const chooseCSS = (m) => {
        return { backgroundColor: `${mode===m?'#d5b69c':'#f8f9fa'}`, color: `${mode===m?'white':'black'}`}
    }
    const filterActivities = (m) => {
        setMode(m)
        setActivities(acts.filter(activity => activity.finished===m))

    }
    const addActivity = () => {}
    useEffect(() => {
        setActs(getActivities())
        setPending(false) 
    }, [])
    useEffect(() => {
        setActivities(acts.filter(activity => activity.finished===mode))
    }, [mode,acts])
  return (
    pending?<Spinner/>:(<div className='container pt-5'>
        <Navbar head='All activities' url="/" icon={freeSet.cilPlus} iconFunc={addActivity} />
        <h1 className="mt-3"><b>我的聚會</b></h1>
        <div className='d-flex justify-content-around my-4'>
            <CCol className='btn mx-2' style={chooseCSS(0)} onClick={e=>filterActivities(0)}>
                聚會列表
            </CCol>
            <CCol className='btn mx-2'style={chooseCSS(1)} onClick={e=>filterActivities(1)}>
                歷史紀錄
            </CCol>
        </div>
        {pending?<Spinner/>:(activities.length>0?activities.map((activity) => (
            <Link to={`/activity/${activity.id}`} className='text-decoration-none text-dark'>
                <div className='d-flex justify-content-between align-items-center mx-3 my-4'>
                    <CCol className='col-3 d-flex justify-content-center align-items-center'>
                        <img src={activity.img} className='img-fluid rounded' style={{maxHeight: "10rem" }} />
                    </CCol>
                    <CCol className='col-8'>
                        <h3><b>{activity.title}</b></h3>
                        <h5 className='text-secondary'>{activity.time}</h5>
                        <a href={activity.addressLink} ><h5 className='text-secondary'>{activity.address}</h5></a>
                    </CCol>
                </div>
            </Link>
        )):<h3 className='text-dark text-center bg-light p-5 m-5'>目前無聚會紀錄喔！</h3>)}
        <Footer bgColor='light' textColor='secondary' />
    </div>)
  )
}

export default Activity
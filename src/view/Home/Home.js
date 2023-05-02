import React from 'react'
import { happyBg, logo } from '.'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className='d-flex flex-column align-items-center d-lg-none'>
          <img src={happyBg} className='card-img position-absolute' style={{opacity:0.3, height:"100%", width:"auto"}} />
          <img src={logo} className='img-fluid card-img-overlay pt-5 mt-5' />
          <Link to='/activities' className='card-img-overlay text-decoration-none d-flex align-items-center justify-content-center'>
              <h1 className='text-dark display-2 bg-white px-5 py-4 rounded-pill text-center'><b>我的聚會</b></h1>
          </Link>
      </div>
      <div className='d-flex flex-column align-items-center justify-content-center d-none d-lg-block'>
        <img src={happyBg} className='opacity-25' style={{position:"absolute", left:0, top:0}} />
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img src={logo} className='img-fluid pt-5 mt-5 position-relative' />
          <Link to='/activities' className='text-decoration-none d-flex align-items-center justify-content-center position-relative'>
              <h1 className='text-dark display-2 bg-white px-5 py-4 rounded-pill text-center'><b>我的聚會</b></h1>
          </Link>
        </div>
      </div>

    </>
  )
}

export default Home
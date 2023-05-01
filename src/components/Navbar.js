import React from 'react'
import {Link} from 'react-router-dom'
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons'

const Navbar = ({head, url, icon, iconFunc}) => {
  return (
    <nav className="d-flex justify-content-between bg-none">
        <Link to={url} className="text-dark d-flex align-items-center text-decoration-none">
            <CIcon className='me-2' icon={freeSet.cilArrowLeft} size="xxl" />
            <h5 className='mb-0 d-flex align-items-center'>{head}</h5>
        </Link>
        {/* {icon && <CIcon icon={icon} onClick={iconFunc} size="xxl" />} */}
    </nav>
  )
}

export default Navbar
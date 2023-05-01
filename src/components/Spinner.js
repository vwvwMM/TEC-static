import React from 'react'

const Spinner = () => {
  return (
    <div className="d-flex flex-row justify-content-center">
      <div className="spinner-border mt-3" style={{color:"#d5b69c"}} role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}

export default Spinner
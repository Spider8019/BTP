import React from 'react'

import { ProgressBar } from 'primereact/progressbar'

const Loader = ({ text = 'Loading' }) => {
  return (
    <div className="m-4">
      <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
    </div>
  )
}

export default Loader

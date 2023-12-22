import React, { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'

const Novel = () => {
  const [visibleBottom, setVisibleBottom] = useState(true)
  return (
    <div>
      <Sidebar
        visible={visibleBottom}
        position="bottom"
        onHide={() => setVisibleBottom(false)}
        className='h-3/4'
        style={{height:"75vh"}}
      >
        <h2>Bottom Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Sidebar>
    </div>
  )
}

export default Novel

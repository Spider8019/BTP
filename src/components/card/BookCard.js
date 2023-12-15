import React, { useState } from 'react'

import { Card } from 'primereact/card'

const BookCard = ({ title, url, author, innerRef }) => {
  const [max, setMax] = useState(false)
  const header = (
    <div className="relative bg-gray-200">
      <i
        onClick={() => setMax(!max)}
        className={`absolute top-4 right-4 pi pi-window-${
          max ? 'minimize' : 'maximize'
        }`}
      ></i>
      <img
        className={`h-60 object-top object-${max ? 'cover' : 'contain'}`}
        alt={title}
        src={url}
      />
    </div>
  )
  return (
    <Card ref={innerRef} title={title} subTitle={author} header={header} className='mx-4'>
      <div className="">
        {/* <div className="w-full rounded overflow-hidden">
          <img alt="" className="object-contain" src={url} />
        </div> */}
      </div>
    </Card>
  )
}

export default BookCard

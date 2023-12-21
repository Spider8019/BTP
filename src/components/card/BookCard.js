import React, { useState } from 'react'
import { Card } from 'primereact/card'

const BookCard = ({ title, url, author, innerRef,preface }) => {
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
      <Card
        layout
        role="region"
        ref={innerRef}
        title={title}
        subTitle={author}
        header={header}
        className="mx-4 h-full"
      >
        <div className="">
          <p className='text-sm line-clamp-5'>{preface}</p>
        </div>
      </Card>
  )
}

export default BookCard

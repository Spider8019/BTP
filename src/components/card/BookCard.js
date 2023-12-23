import React, { useState } from 'react'
import { Card } from 'primereact/card'
import { Tag } from 'primereact/tag'

const BookCard = ({ title, url, author, innerRef, preface, mrp, language,dis_price }) => {
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
  const subTitle = (
    <div>
      <p>{author}</p>
      <div>
        <Tag
          style={{ borderColor: '#006233', background: '#0062339F' }} 
          className="border"
        >
          <s className='font-light text-xs'>₹{mrp}</s> ₹{dis_price}
        </Tag>
        <Tag
          style={{ borderColor: '#006233', background: '#0048629F' }}
          className="ml-2 border"
        >
          {language}
        </Tag>
      </div>
    </div>
  )
  return (
    <Card
      layout
      role="region"
      ref={innerRef}
      title={title}
      subTitle={subTitle}
      header={header}
      className="mx-4 h-full"
    >
      <div className="">
        <p className="text-sm line-clamp-3">{preface}</p>
      </div>
    </Card>
  )
}

export default BookCard

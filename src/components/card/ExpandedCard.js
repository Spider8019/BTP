import React from 'react'
import { Card } from 'primereact/card'

const ExpandedCard = ({ title, url, author, innerRef, preface }) => {
  const header = (
    <div className="relative bg-gray-200 w-full">
      <img
        className={`h-full object-top object-contain }`}
        alt={title}
        src={url}
      />
    </div>
  )
  return (
    // <motion.div layout>
    <Card
      layout
      role="region"
      ref={innerRef}
      title={title}
      subTitle={author}
      header={header}
      className="mx-4 absolute bottom-0 left-0 right-0 h-3/4 sm:static sm:h-4/5 sm:w-3/4 overflow-hidden expandedCard sm:grid"
      style={{  gridTemplateColumns: '0.6fr 1fr' }}
    >
      <div className="">
        <p className="text-sm">{preface}</p>
      </div>
    </Card>
  )
}

export default ExpandedCard

import React from 'react'

const BookCard = ({ title, url, author }) => {
  return (
    <div className="h-80 shadow-2xl border-8 hover:shadow-[#f1d5bc] border-white bg-white rounded overflow-hidden m-4 relative">
      <div className="w-full rounded overflow-hidden">
        <img alt="" className="object-contain" src={url} />
      </div>
      <div
        className=" text-sm absolute bottom-0 left-0 right-0 p-4"
        style={{ background: 'linear-gradient(transparent,black)' }}
      >
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm text-gray-100">{author}</p>
      </div>
    </div>
  )
}

export default BookCard

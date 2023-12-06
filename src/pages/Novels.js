// MyComponent.js

import React, { useEffect, useState } from 'react'
import BookCard from '../components/card/BookCard'
import { fetchingAllNovels } from '../global/api'
import { useQuery } from 'react-query'
const Novels = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    'fetchingAllNovels',
    fetchingAllNovels,
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data)

  return (
    <div className='p-12 bg-slate-50  '>
      <p>PAPER PANTRY</p>
      <p className='text-4xl font-bold'>Novels in stock</p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mt-8">
        {data.map((item) => (
          <BookCard {...item} />
        ))}
      </div>
    </div>
  )
}

export default Novels

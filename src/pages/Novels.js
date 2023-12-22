// MyComponent.js
import { useEffect, useState } from 'react'
import { MegaMenu } from 'primereact/megamenu'
import BookCard from '../components/card/BookCard'
import Loader from '../components/loaders/Loader'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { defaults } from '../global/defaultValues'
import ExpandedCard from '../components/card/ExpandedCard'
import items from '../global/assets/megamenu'

const Novels = () => {
  const { ref, inView } = useInView()
  const [selectedId, setSelectedId] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [forceRerender, setForceRerender] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [selectedSort, setSelectedSort] = useState(null)

  const fetchingAllNovels = async ({ pageParam }) => {
    const languageQuery = selectedLanguage
      ? `&language=${selectedLanguage}`
      : ''
    const genreQuery = selectedGenre ? `&genre=${selectedGenre}` : ''
    const sortQuery = selectedSort ? `&sort=${selectedSort}` : ''
    const res = await fetch(
      `${defaults.baseBackendUrl}/novels?pageNumber=${pageParam}${languageQuery}${genreQuery}${sortQuery}`,
    )
    const rst = await res.json()
    return rst
  }

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['fetchingAllNovels'],
    queryFn: fetchingAllNovels,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined
      return nextPage
    },
  })
  console.log(selectedLanguage)
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  useEffect(() => {
    const fetchData = async () => {
      await refetch(undefined, undefined, {
        onSuccess: () => setForceRerender((prev) => !prev),
      })
    }

    fetchData()
  }, [selectedLanguage, selectedGenre, refetch])

  if (status === 'pending') return <Loader />

  if (error) return 'An error has occurred: ' + error.message
  const content =
    data !== undefined &&
    data.pages.map((books) =>
      books.map((book, index) => {
        const isLastBook = books.length === index + 1

        return (
          <motion.div
            key={book.book_id}
            layoutId={book.book_id}
            onClick={() => setSelectedId(book.book_id)}
            style={{
              gridColumn: book.book_id === selectedId ? 'span 2' : 'span 1',
            }}
          >
            {isLastBook ? (
              <BookCard innerRef={ref} {...book} />
            ) : (
              <BookCard {...book} />
            )}
          </motion.div>
        )
      }),
    )

  return (
    <div className="p-4 sm:p-8 bg-slate-50  ">
      <div className="text-center sm:text-left">
        <p>PAPER PANTRY</p>
        <p className="text-4xl font-bold mb-8">Books in stock</p>
      </div>
      <MegaMenu
        model={items({
          refetch,
          setForceRerender,
          setSelectedGenre,
          setSelectedLanguage,
          setSelectedSort,
        })}
        breakpoint="960px"
      />
      {/* <button onClick={() => setFilter("English")}>adfa</button> */}
      <div
        className="grid grid-cols-1 sm:grid-cols-4 gap-8 mt-8"
        key={forceRerender}
      >
        {content}
      </div>
      {isFetchingNextPage && <Loader />}
    </div>
  )
}

export default Novels

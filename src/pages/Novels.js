// MyComponent.js
import { useEffect } from 'react'
import { MegaMenu } from 'primereact/megamenu'
import BookCard from '../components/card/BookCard'
import Loader from '../components/loaders/Loader'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

const Novels = () => {
  const { ref, inView } = useInView()
  const fetchingAllNovels = async ({ pageParam }) => {
    const res = await fetch(
      `https://books-temp-dev.vercel.app/novels?pageNumber=${pageParam}`,
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
  } = useInfiniteQuery({
    queryKey: ['fetchingAllNovels'],
    queryFn: fetchingAllNovels,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined
      return nextPage
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (status === 'pending') return <Loader />

  if (error) return 'An error has occurred: ' + error.message
  const content =
    data !== undefined &&
    data.pages.map((books) =>
      books.map((book, index) => {
        if (books.length === index + 1) {
          return <BookCard innerRef={ref} key={book.book_id} {...book} />
        }
        return <BookCard key={book.book_id} {...book} />
      }),
    )

  const items = [
    {
      label: 'Language',
      icon: 'pi pi-fw pi-language',
      items: [
        [
          {
            label: 'National',
            items: [{ label: 'Hindi' }],
          },
          {
            label: 'International',
            items: [{ label: 'English' }],
          },
        ],
      ],
    },
    {
      label: 'Genres',
      icon: 'pi pi-fw pi-sitemap',
      items: [
        [
          {
            label: 'Fiction',
            items: [
              { label: 'Fantasy' },
              { label: 'Science Fiction' },
              { label: 'Dystopian' },
              { label: 'Action & Adventure' },
              { label: 'Mystery' },
              { label: 'Horro' },
              { label: 'Thriller & Suspense' },
            ],
          },
          {
            label: 'Nonfiction genres',
            items: [
              { label: 'Memoir & Autobiography' },
              { label: 'Biography' },
              { label: 'Food & Drink' },
              { label: 'Art & Photography' },
            ],
          },
        ],
      ],
    },
  ]

  return (
    <div className="p-4 sm:p-8 bg-slate-50  ">
      <div className="text-center sm:text-left">
        <p>PAPER PANTRY</p>
        <p className="text-4xl font-bold mb-8">Novels in stock</p>
      </div>
      <MegaMenu model={items} breakpoint="960px" />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mt-8">
        {content}
      </div>
      {isFetchingNextPage && <Loader />}
    </div>
  )
}

export default Novels

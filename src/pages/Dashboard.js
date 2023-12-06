import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { pageFramer } from '../global/defaultValues'
import { useNavigate } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import DASHHEAD from '../static/images/dashhead.png'

export default function Home() {
  const [aspectRatio, setAspectRatio] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let availableHeight = window.innerHeight - 136
      let availableWidth = window.innerWidth
      setAspectRatio(availableWidth / availableHeight)
    }
  }, [])

  return (
    <div className="flex flex-col" style={{ height: '100vh' }}>
      <Navbar />
      <div className="grid grid-cols-2 grow">
        <div className="grid place-items-center h-full overflow-hidden">
          <div
            style={{
              backgroundImage: `url(${DASHHEAD})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <div className="grid place-items-center grid-cols-2 grid-rows-2">
          <div
            className="bg-[#006233c6] h-full w-full grid place-items-center"
            onClick={() => navigate('/novels')}
          >
            Novels available for purchase or rental
          </div>
          <div className="bg-[#F1D5BC] h-full w-full"></div>
          <div className="bg-[#006233c6] h-full w-full grid place-items-center">
            Novels available for purchase or rental
          </div>
          <div className="bg-[#F1D5BC] h-full w-full"></div>
        </div>
      </div>
    </div>
  )
}

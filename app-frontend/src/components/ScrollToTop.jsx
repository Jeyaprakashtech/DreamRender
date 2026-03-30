import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollTop}
          className='fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl
            flex items-center justify-center cursor-pointer border-none'
          style={{
            background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
            boxShadow: '0 0 20px rgba(124,58,237,0.4)',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0,  scale: 1   }}
          exit={{    opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 28px rgba(124,58,237,0.65)',
          }}
          whileTap={{ scale: 0.95 }}
          aria-label='Scroll to top'
        >
          <svg
            width='16' height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#fff'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='18 15 12 9 6 15' />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
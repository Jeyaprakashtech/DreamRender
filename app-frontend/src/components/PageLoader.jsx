import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { assets } from '../assets/assets'

function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Hide loader after 2.2s — enough for fonts + first paint
    const timer = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className='fixed inset-0 z-9999 flex flex-col items-center justify-center'
          style={{ background: '#0A0A0F' }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
          }}
        >
          {/* Dot grid */}
          <div
            className='absolute inset-0 pointer-events-none'
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.15) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Purple radial glow */}
          <div
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-125 h-125 pointer-events-none'
            style={{
              background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)',
            }}
          />

          <div className='relative z-10 flex flex-col items-center gap-8'>

            {/* Logo */}
            <motion.div
              className='font-extrabold text-3xl tracking-widest'
              style={{
                fontFamily: "'Syne', sans-serif",
                background: 'linear-gradient(135deg, #7C3AED, #22D3EE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img width={250} src={assets.logo} alt="" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className='text-sm'
              style={{ fontFamily: "'DM Sans', sans-serif", color: '#6B5F8A' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              Dream it. Type it. Render it.
            </motion.p>

            {/* Animated progress bar */}
            <motion.div
              className='w-48 h-0.5 rounded-full overflow-hidden'
              style={{ background: '#1C1828' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className='h-full rounded-full'
                style={{
                  background: 'linear-gradient(90deg, #7C3AED, #22D3EE)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader
import { useState } from 'react'

const SmartImage = ({
  src,
  fallback = 'https://images.pexels.com/photos/262347/pexels-photo-262347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  alt,
  className = '',
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState(src)

  const handleError = () => {
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback)
    }
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
      {...rest}
    />
  )
}

export default SmartImage

import React from 'react'

export const Greeting = () => {
  const currentTime = new Date()
  const hours = currentTime.getHours()
  let greeting = ""

  if (hours < 12) {
    greeting = "Buenos días"
  }else if (hours < 18) {
    greeting = "Buenas tardes"
  } else {
    greeting = "Buenas noches"
  }

  return (
    <h1 className='text-3xl tracking-tighter font-semibold text-white mb-6'>
      {greeting}
    </h1>
  )
}

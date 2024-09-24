import React from 'react'

type CardProps = {
  children:React.ReactNode
}

type CardsProps = {
  title?:string
  description?:string
  value?:string
}
function Card({children}:CardProps){
  return(
    <>
      {children}
    </>
  )
}

function Head({title, value, description}:CardsProps){
  return(
    <div className='bg-[#e8e8e8] p-8'>
    <div className='flex flex-row justify-between'>
    <h2 className='text-xl font-semibold text-gray-500'>{title}</h2>
  </div>
  <h1 className='text-2xl font-bold mt-2'>{value}</h1>
    </div>
  )
}


Card.Head = Head;



export {Card};
import React from 'react'
import {Card} from '../../components/card-head'

function Analysis() {
  return (
    <div className='mt-8'>
      <div className='grid grid-col-1 md:grid-cols-4 gap-4'>
        <Card.Head title='Investidores' value='122'/>
        <Card.Head title='Empresas' value='122'/>
        <Card.Head title='Mentores' value='122'/>
        <Card.Head title='Startups' value='122'/>
        
      </div>
    </div>
  )
}

export default Analysis
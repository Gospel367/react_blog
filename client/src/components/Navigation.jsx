import { useState } from 'react'
import Categories from './Categories'
import Authors from './Authors'

const Navigation = ({ filter, setFilter }) => {


  return (
    <div>

      <div className='navigation'>
        <Categories filter={filter} setFilter={setFilter} />
      </div>
    </div>
  )
}

export default Navigation

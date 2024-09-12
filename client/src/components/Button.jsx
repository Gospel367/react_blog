import { useState } from 'react'

const Button = ({ button_name, onclick }) => {


  return (
    <div>
      <button onClick={onclick}>
        {button_name}
      </button>
    </div>
  )
}

export default Button

import React from 'react'

import SVGIcon from 'components/SVGIcon'

import st from './styles.module.css'

function App() {
  return (
    <div className={st.container}>
      Container <SVGIcon name="plus" />
    </div>
  )
}

export default App

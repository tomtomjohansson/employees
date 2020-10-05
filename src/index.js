import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './router'
import style from './index.css'

const App = () => {
  return (
    <div className={style.mainContainer}>
      <Routes style={style} />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))

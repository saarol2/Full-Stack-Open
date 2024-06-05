import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <div>{props.text} {props.value}</div>
  )
}
const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const Statistics = (props) => {

  const all = props.good + props.neutral + props.bad

  const Average = () => {
    const total = props.good - props.bad
    if (total == 0) {
      return 0
    }
    return (
      (total / (props.good + props.neutral + props.bad))
    )
    }
    const Positive = () => {
      if (all == 0) {
        return 0
      }
      return (
        (props.good / all)
      )
    }

    if (all == 0){
      return(
        <div>
        No feedback given
        </div>
      )
    }

  return(
    <div>
      <StatisticLine text='good ' value = {props.good}/>
      <StatisticLine text='neutral ' value = {props.neutral}/>
      <StatisticLine text='bad ' value = {props.bad}/>
      <StatisticLine text='all ' value = {props.good + props.bad + props.neutral}/>
      <StatisticLine text='average ' value = {Average()}/>
      <StatisticLine text='positive ' value = {Positive()}/>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>
        statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
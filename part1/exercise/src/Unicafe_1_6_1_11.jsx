import { useState } from 'react'

const Statistics = ({good, neutral, bad, all, average, positivePercentage}) => {
  if (all === 0) {
  return (       
  <p>No feedback given</p>
  )
  } else {
  return (
    <table>
      <tbody>
  <StatisticLine text = "good" value ={good} />        
  <StatisticLine text = "neutral" value ={neutral} />   
  <StatisticLine text = "bad" value ={bad} />   
  <StatisticLine text = "all" value ={all} />   
  <StatisticLine text = "average" value ={average} />   
  <StatisticLine text = "positive" value ={positivePercentage + "%"} />   
      </tbody>
    </table> 
  )
  }

}

const StatisticLine = ({text, value}) => {
  return (
  <tr><td>{text}</td>
  <td>{value}</td></tr>
  )
}

const Button = ({text,onClick}) => {
  return <button onClick={onClick}>{text}</button> 
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) /all
  const positivePercentage = all === 0 ? 0 : (good / all) * 100
  const pressGood = () => {
    setGood(good + 1);
  }

  const pressNetural = () => {
    setNeutral(neutral + 1);
  }

  const pressbad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text="good" onClick={pressGood} />
        <Button text="netural" onClick={pressNetural}/>
        <Button text="bad" onClick={pressbad}/>
      </div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positivePercentage={positivePercentage} />
    </div>
  )
}

export default App
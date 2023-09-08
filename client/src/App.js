import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import { useEffect, useState } from 'react'



const App = () => {
  const userEmail = 'trane@test.com'
  const [ tasks, setTasks] = useState(null)

const getData = async ()=> {
  try {
    //passing a param to find the user's email
    const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
    const json = await response.json()
    console.log(json)
    setTasks(json)
  } catch (err) {
    console.error(err)
  }
 }

 useEffect(() => getData, [])

 // logs the tasks in the console
 console.log(tasks)

 // This will be sorting by the date
 const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))



  return (
    <div className="app"> 
      <ListHeader listName={'Holiday tick list'}/>
      {sortedTasks?.map((tasks) => <ListItem key={tasks.id} task={task} />)}
    </div>
  );
}

export default App;

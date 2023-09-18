import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useEffect, useState } from 'react'



const App = () => {
  const userEmail = 'trane@test.com'
  const [ tasks, setTasks] = useState(null)

  const authToken = false

const getData = async ()=> {
  try {
    //passing a param to find the user's email
    const response = await fetch(`${process.env.REACT_APP_SERVERURL} /todos/${userEmail}`)
    const json = await response.json()
    console.log(json)
    setTasks(json)
  } catch (err) {
    console.error(err)
  }
 }

 // if authToken exsits then get the data
 useEffect(() => {
  if (authToken) {
    getData()
  }
 })

 // logs the tasks in the console
 console.log(tasks)

 // This will be sorting by the date
 const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))



  return (
    <div className="app"> 
    {/* if authToken exsits or not */}
      {!authToken && <Auth/>}
      {authToken && 
      <>
      <ListHeader listName={'Holiday tick list'} getData={getData}/>
      {sortedTasks?.map((tasks) => <ListItem key={tasks.id} task={task} getData={getData} />)}
      </>}
    </div>
  );
}

export default App;

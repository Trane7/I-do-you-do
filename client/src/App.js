import ListHeader from './components/ListHeader'
import { useEffect } from 'react'


const App = () => {

const getData = async ()=> {
  const userEmail = 'trane@test.com'
  try {
    //passing a param to find the user's email
    const response = await fetch(`http://localhost:8000/youdos/${userEmail}`)
    const json = await response.json()
    console.log(json)
  } catch (err) {
    console.error(err)
  }
 }

 useEffect(() => getData, [])



  return (
    <div className="app"> 
      <ListHeader listName={'Holiday tick list'}/>
    </div>
  );
}

export default App;

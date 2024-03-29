import { useState } from 'react'
import TickIcon from './TickIcon'
import Modal from './Modal'
import ProgressBar from './ProgressBar'



const ListItem = ({ tasks, getData }) => {
  const [showModal, setShowModal] = useState(false)

  const deleteItem = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'DELETE'
      })
      if (response.status === 200) {
        getData()
      }

    } catch (err) {
      console.log(err)
    }
  }

    return (
      <li className="list-item">
        <div className="info-container">
          <TickIcon/>
          <p>{tasks.title}</p>
          <ProgressBar  Progress={task.progress}/>
        </div>

        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteItem}>DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData= {getData} tasks={tasks} />}
      </li>
    );
  }
  
  export default ListItem;
  
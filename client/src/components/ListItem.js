import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'



const ListItem = (tasks) => {
    return (
      <li className="list-item">
        <div className="info-container">
          <TickIcon/>
          <p>{tasks.title}</p>
          <ProgressBar/>
        </div>

        <div className="button-container">
          <button className="edit">EDIT</button>
          <button className="delete">DELETE</button>
        </div>
      </li>
    );
  }
  
  export default ListItem;
  
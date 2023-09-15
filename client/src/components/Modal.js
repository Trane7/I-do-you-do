import { useState } from "react";

const Modal = ({ mode, setShowModal, getData, tasks }) => {
  const editMode = mode === 'edit' ? true: false

  const [data, setData] = useState({
    // this updates the data when trying to edit a task
    user_email: editMode ? tasks.user_email : 'trane@test.com',
    title: editMode ? tasks.title : null,
    progress: progess ? tasks.progess : 50,
    date: editMode ? task.date : new Date()
  })

  const postData = async (e) => {
    // this keeps the page from refreshing on its own
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log('YOU DID IT')
        setShowModal(false)
        getData()
      }
    } catch(err) {
      console.log(err)
    }
  }


  const editData = async(e) => {
    e.preventDefault()
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
          method: 'PUT',
          headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify(data)
        })
        if (response.status === 200) {
          setShowModal(false)
          getData()
        }
    }catch (err) {
      console.log(err)
    }
  }



  const handleChange = (e) => {
    console.log("changing!", e);
    // getting the name and value from the input targeting e.
    const {name, value} = e.target

    setData(data => ({
      ...data,
      [name] : value
    }))

    console.log(data)
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Lets {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeHolder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label for="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          {/* if in edit mode we can edit the data if not then post the data */}
          <input className={mode} type="submit" onClick={editMode ? editData : postData}/>
        </form>
      </div>
    </div>
  );
};

export default Modal;

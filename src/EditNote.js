import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import React, { useState } from "react";


function EditNote() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  //Using OutletContext to pass props
  const { activeNote } = useOutletContext();
  const { onDeleteNote } = useOutletContext();
  const { notes } = useOutletContext();

  //updating the state variables
  const [title, setTitle] = useState(activeNote.title);
  const [body, setBody] = useState(activeNote.body);
  const [date, setDate] = useState(activeNote.date);

  console.log(notes);
  console.log(activeNote);


  //updating the regular note
  const index = notes.findIndex(note => note.id === activeNote.id);
  const updatedNotes = [...notes];
  
  const handleSave = () => {
    updatedNotes[index].title = title;
    updatedNotes[index].body = body;
    updatedNotes[index].date = date;
    
    activeNote.title = title;
    activeNote.body = body;
    activeNote.date = date;
    navigate(`/notes/${noteId}`);
  }

  return (
    <div className="editnote">
      <div className="editnote-header">
        <div className="editnote-title">
          <input type="text" id="titleofnote" value={title} onChange={e => setTitle(e.target.value)} />
          <input type="datetime-local" id="dateBtn" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="editnote-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={(e) => onDeleteNote(activeNote.id)}>Delete</button>
        </div>
      </div>
      <ReactQuill value={body} onChange={setBody} placeholder={"Your note here"}
      />
    </div>
  );
}

export default EditNote;

import { useOutletContext } from "react-router-dom";
// import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function ViewNote () {
    const navigate = useNavigate();

    const { activeNote } = useOutletContext();
    const { onDeleteNote } = useOutletContext();


    console.log(activeNote);

    const edit = () => {
        navigate(`/notes/${activeNote.id}/edit`);
    }

    const createMarkup = () => {
        return {__html: activeNote.body};
    }

    return (
    <div className="viewNote">
        <div className="viewNote-header">
            <h2 className="viewNote-title">{activeNote.title}</h2>
            <div className="viewNote-buttons">
                <button onClick={edit}>Edit</button>
                <button onClick={(e) => onDeleteNote(activeNote.id)}>Delete</button>
            </div>
        </div>
        <div dangerouslySetInnerHTML={createMarkup()}></div>
    </div>
    );
  }
  
  export default ViewNote;
  
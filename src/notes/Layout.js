import { useNavigate, Outlet } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import Note from "./Note";

function Layout() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState({
    id: null,
    title: "",
    body: "",
  });
  const [nextId, setNextId] = useState(
    JSON.parse(localStorage.getItem("nextId")) || 1
  );

  const addNote = useCallback(() => {
    const newNote = {
      id: nextId,
      title: "Untitled",
      body: "",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setNextId(nextId + 1);
    navigate(`/notes/${newNote.id}/edit`);
  }, [nextId, notes, navigate]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("nextId", JSON.stringify(nextId));
  }, [nextId]);

  const onDeleteNote = useCallback(
    (noteId) => {
      const deletedNoteIndex = notes.findIndex((note) => note.id === noteId);
      const nextActiveNoteIndex =
        deletedNoteIndex === notes.length - 1
          ? deletedNoteIndex - 1
          : deletedNoteIndex + 1;
      const nextActiveNote = notes[nextActiveNoteIndex];

      if (window.confirm("Are you sure?")) {
        const updatedNotes = notes.filter(({ id }) => id !== noteId);
        setNotes(updatedNotes);
        if (updatedNotes.length === 0) {
          navigate("/notes");
        } else {
          setActiveNote(nextActiveNote);
          navigate(`/notes/${nextActiveNote.id}`);
        }
      }
    },
    [notes, navigate]
  );

  const toggleSides = () => {
    const leftside = document.querySelector(".leftside");
    const rightside = document.querySelector(".rightside");
  
    leftside.classList.toggle("hide");
    rightside.classList.toggle("hide");
  };
  
  
  return (
    <div className="App">
      <header>
        <h1>Lotion</h1>
        <h3>Like Notion, but worse.</h3>
        <button className="menu-icon" onClick={() => toggleSides()}>&#9776;</button>
      </header>

      <div className="app-layout">
        {/* LeftSide */}
        <div className="leftside">
          <div className="app-leftside-header">
            <h2>Notes</h2>
            <button onClick={addNote}>&#43;</button>
          </div>
          <div className="app-leftside-body">
            {notes.length === 0 ? (
              <p>No Active Note</p>
            ) : (
              <Note notes={notes} activeNote={activeNote} setActiveNote={setActiveNote} />
            )}
          </div>
        </div>

        {/* RightSide */}
        <div className="rightside">
          {notes.length === 0 ? (
            <p>Select a note, or create a new one.</p>
          ) : (
            <Outlet context={{ activeNote: activeNote, onDeleteNote: onDeleteNote, notes: notes}}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
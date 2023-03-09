import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

function Note({ notes, activeNote, setActiveNote }) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  return (
    <div className="app-leftside-notes">
      {notes.map(({ id, title, body, lastModified }, i) => (
        <Link key={id} to={`/notes/${id}`}>
          <div
            className={`app-leftside-note ${id === activeNote.id && "active"}`}
            onClick={() => setActiveNote({ id, title, body })}
          >
            <div className="leftside-note-title">
              <strong>{title}</strong>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  body ? body.substr(0, 100) + "..." : ".."
                ),
              }}
            />
            <small className="note-meta">{formatDate(lastModified)}</small>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Note;

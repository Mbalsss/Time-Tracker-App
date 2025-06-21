import React, { useState } from "react";
import { TimeEntry } from "../types";

interface Props {
  entries: TimeEntry[];
  onDelete: (id: string) => void;
  onUpdate: (entry: TimeEntry) => void;
}

const TimeEntryList: React.FC<Props> = ({ entries, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState("");
  const [editHours, setEditHours] = useState(0);

  const handleEdit = (entry: TimeEntry) => {
    setEditId(entry.id);
    setEditTask(entry.task);
    setEditHours(entry.hours);
  };

  const handleUpdate = () => {
    if (!editTask || editHours <= 0) return;
    onUpdate({ id: editId!, task: editTask, hours: editHours });
    setEditId(null);
  };

  return (
    <div className="card">
      <h3>Time Entries</h3>
      {entries.length === 0 ? <p>No entries yet.</p> : (
        <ul>
          {entries.map(entry => (
            <li key={entry.id}>
             {editId === entry.id ? (
  <>
    <input value={editTask} onChange={e => setEditTask(e.target.value)} />
    <input
      type="number"
      value={editHours}
      onChange={e => setEditHours(+e.target.value)}
    />
    <div className="button-group">
      <button onClick={handleUpdate}>Save</button>
      <button onClick={() => setEditId(null)}>Cancel</button>
    </div>
  </>
) : (
  <>
    {entry.task} - {entry.hours.toFixed(2)} h
    <div className="button-group">
      <button onClick={() => handleEdit(entry)}>Edit</button>
      <button onClick={() => onDelete(entry.id)}>Delete</button>
    </div>
  </>
)}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeEntryList;

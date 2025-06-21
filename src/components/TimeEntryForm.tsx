import React, { useState } from "react";
import { TimeEntry } from "../types";

interface Props {
  onSave: (entry: TimeEntry) => void;
}

const TimeEntryForm: React.FC<Props> = ({ onSave }) => {
  const [task, setTask] = useState("");
  const [hours, setHours] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || hours <= 0) return alert("Enter valid task and hours");
    onSave({ id: crypto.randomUUID(), task, hours });
    setTask("");
    setHours(0);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Add Time Entry</h3>
      <input value={task} onChange={e => setTask(e.target.value)} placeholder="What did you work on?" />
      <input type="number" value={hours} onChange={e => setHours(+e.target.value)} min="0" step="0.1" />
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default TimeEntryForm;

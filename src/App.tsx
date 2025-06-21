import React, { useState } from "react";
import "./App.css";
import TimeEntryForm from "./components/TimeEntryForm";
import TimeEntryList from "./components/TimeEntryList";
import TotalHours from "./components/TotalHours";
import Timer from "./components/Timer";
import { TimeEntry } from "./types";

function App() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);

  const addEntry = (entry: TimeEntry) => setEntries([...entries, entry]);
  const updateEntry = (updated: TimeEntry) =>
    setEntries(entries.map(e => (e.id === updated.id ? updated : e)));
  const deleteEntry = (id: string) => setEntries(entries.filter(e => e.id !== id));

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div className="App">
      <h1>Time Tracker</h1>
      <p>Track your productivity and manage your time effectively</p>
      <TotalHours hours={totalHours} />
      <div className="grid">
        <Timer onSave={addEntry} />
        <TimeEntryForm onSave={addEntry} />
      </div>
      <TimeEntryList entries={entries} onUpdate={updateEntry} onDelete={deleteEntry} />
    </div>
  );
}

export default App;

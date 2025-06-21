import React, { useState, useRef } from "react";
import { TimeEntry } from "../types";

interface Props {
  onSave: (entry: TimeEntry) => void;
}

const Timer: React.FC<Props> = ({ onSave }) => {
  const [task, setTask] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (!task.trim()) return alert("Task is required");
    setActive(true);
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActive(false);
    onSave({ id: crypto.randomUUID(), task, hours: +(seconds / 3600).toFixed(2) });
    setTask("");
    setSeconds(0);
  };

  return (
    <div className="card">
      <h3>Active Timer</h3>
      <input value={task} onChange={e => setTask(e.target.value)} placeholder="What are you working on?" />
      <div>{(seconds / 3600).toFixed(2)} h</div>
      {!active ? <button onClick={start}>Start</button> : <button onClick={stop}>Stop</button>}
    </div>
  );
};

export default Timer;

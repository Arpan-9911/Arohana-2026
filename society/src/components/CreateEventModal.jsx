import { useState } from "react";

const CreateEventForm = () => {
  const [eventName, setEventName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", eventName);
    setEventName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-purple-600/20 p-6 rounded-xl border border-purple-500/30"
    >
      <h3 className="text-lg font-semibold mb-4">Create New Event</h3>

      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        className="w-full p-3 rounded-lg bg-[#1a0026] border border-white/10 text-white"
      />

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;

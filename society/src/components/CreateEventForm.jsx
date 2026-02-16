import { useState } from "react";
import { CalendarDays, Clock } from "lucide-react";

const CreateEventForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bannerImage: "",
    type: "solo",
    minTeamSize: "",
    maxTeamSize: "",
    generalInstructions: "",
    rounds: [],
    onlineSubmissionDeadline: "",
    eventDate: "",
    eventTime: "",
    deadlineTime: "",
  });

  const [roundTitle, setRoundTitle] = useState("");
  const [roundDescription, setRoundDescription] = useState("");
  const [roundRules, setRoundRules] = useState([]);
  const [currentRule, setCurrentRule] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* ================= Banner Upload ================= */

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        bannerImage: reader.result, // Base64 stored
      });
    };
    reader.readAsDataURL(file);
  };

  /* ================= Add Rule ================= */

  const addRule = () => {
    if (!currentRule.trim()) return;
    setRoundRules([...roundRules, currentRule.trim()]);
    setCurrentRule("");
  };

  const removeRule = (index) => {
    setRoundRules(roundRules.filter((_, i) => i !== index));
  };

  /* ================= Add Round ================= */

  const addRound = () => {
    if (!roundTitle) return;

    const newRound = {
      title: roundTitle,
      description: roundDescription,
      rules: roundRules,
    };

    setFormData({
      ...formData,
      rounds: [...formData.rounds, newRound],
    });

    setRoundTitle("");
    setRoundDescription("");
    setRoundRules([]);
  };

  /* ================= Submit ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingEvents =
      JSON.parse(localStorage.getItem("societyEvents")) || [];

    const newEvent = {
      ...formData,
      eventDate: `${formData.eventDate} ${formData.eventTime}`,
      onlineSubmissionDeadline: `${formData.onlineSubmissionDeadline} ${formData.deadlineTime}`,
      id: Date.now(),
    };

    const updatedEvents = [...existingEvents, newEvent];
    localStorage.setItem("societyEvents", JSON.stringify(updatedEvents));

    onCreate(updatedEvents);

    setFormData({
      title: "",
      description: "",
      bannerImage: "",
      type: "solo",
      minTeamSize: "",
      maxTeamSize: "",
      generalInstructions: "",
      rounds: [],
      onlineSubmissionDeadline: "",
      eventDate: "",
      eventTime: "",
      deadlineTime: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 space-y-4"
    >
      <h2 className="text-xl font-semibold text-purple-400">
        Create New Event
      </h2>

      {/* Title */}
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event Title"
        className="w-full p-3 bg-black/40 rounded-lg"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-3 bg-black/40 rounded-lg"
      />

      {/* ================= Upload Banner ================= */}
      <div>
        <label className="block text-white/70 mb-2">
          Upload Banner Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleBannerUpload}
          className="w-full p-3 bg-black/40 rounded-lg"
        />
      </div>

      {/* Type */}
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full p-3 bg-black/40 rounded-lg"
      >
        <option value="solo">Solo</option>
        <option value="group">Group</option>
      </select>

      {formData.type === "group" && (
        <div className="grid grid-cols-2 gap-4">
          <input
            name="minTeamSize"
            value={formData.minTeamSize}
            onChange={handleChange}
            placeholder="Min Team Size"
            type="number"
            className="p-3 bg-black/40 rounded-lg"
          />
          <input
            name="maxTeamSize"
            value={formData.maxTeamSize}
            onChange={handleChange}
            placeholder="Max Team Size"
            type="number"
            className="p-3 bg-black/40 rounded-lg"
          />
        </div>
      )}

      {/* General Instructions */}
      <textarea
        name="generalInstructions"
        value={formData.generalInstructions}
        onChange={handleChange}
        placeholder="General Instructions"
        className="w-full p-3 bg-black/40 rounded-lg"
      />

      {/* ================= DATE & TIME ================= */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-white/70 mb-2">
            Event Date
          </label>

          <div className="flex gap-3">

            <div className="relative flex-1">
              <CalendarDays size={18} className="absolute left-3 top-3 text-purple-400" />
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-black/40 rounded-lg"
                required
              />
            </div>

            <div className="relative flex-1">
              <Clock size={18} className="absolute left-3 top-3 text-pink-400" />
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-black/40 rounded-lg"
                required
              />
            </div>

          </div>
        </div>

        <div>
          <label className="block text-white/70 mb-2">
            Submission Deadline
          </label>

          <div className="flex gap-3">

            <div className="relative flex-1">
              <CalendarDays size={18} className="absolute left-3 top-3 text-purple-400" />
              <input
                type="date"
                name="onlineSubmissionDeadline"
                value={formData.onlineSubmissionDeadline}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-black/40 rounded-lg"
                required
              />
            </div>

            <div className="relative flex-1">
              <Clock size={18} className="absolute left-3 top-3 text-pink-400" />
              <input
                type="time"
                name="deadlineTime"
                value={formData.deadlineTime}
                onChange={handleChange}
                className="w-full pl-10 p-3 bg-black/40 rounded-lg"
                required
              />
            </div>

          </div>
        </div>

      </div>

      {/* ================= ROUNDS ================= */}

      <div className="bg-black/30 p-4 rounded-xl space-y-3">
        <h3 className="text-purple-300">Add Round</h3>

        <input
          value={roundTitle}
          onChange={(e) => setRoundTitle(e.target.value)}
          placeholder="Round Title"
          className="w-full p-2 bg-black/40 rounded"
        />

        <textarea
          value={roundDescription}
          onChange={(e) => setRoundDescription(e.target.value)}
          placeholder="Round Description"
          className="w-full p-2 bg-black/40 rounded"
        />

        {/* Add Rule */}
        <div className="flex gap-2">
          <input
            value={currentRule}
            onChange={(e) => setCurrentRule(e.target.value)}
            placeholder="Add Rule"
            className="flex-1 p-2 bg-black/40 rounded"
          />
          <button
            type="button"
            onClick={addRule}
            className="bg-purple-600 px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Rules Display */}
        <ul className="space-y-1 text-sm text-white/70">
          {roundRules.map((rule, index) => (
            <li key={index} className="flex justify-between items-center">
              {rule}
              <button
                type="button"
                onClick={() => removeRule(index)}
                className="text-red-400 text-xs"
              >
                remove
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={addRound}
          className="bg-purple-600 px-4 py-2 rounded-lg"
        >
          Add Round
        </button>
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-xl"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;

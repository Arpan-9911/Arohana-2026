import { useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { useEventStore } from "../store/event.store";

const CreateEventForm = () => {
  const { addEvent } = useEventStore();
  const [loading, setLoading] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "solo",
    minTeamSize: 1,
    maxTeamSize: 1,
    generalInstructions: [],
    rounds: [],
    isOnlineSubmission: false,
    eventDate: "",
    eventTime: "",
    onlineSubmissionDeadline: "",
    deadlineTime: "",
  });

  const [instructionInput, setInstructionInput] = useState("");
  const [roundTitle, setRoundTitle] = useState("");
  const [roundDescription, setRoundDescription] = useState("");
  const [roundRules, setRoundRules] = useState([]);
  const [currentRule, setCurrentRule] = useState("");
  const [instructionInput, setInstructionInput] = useState("");

  /* ================= General Change ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= Banner ================= */

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBannerFile(file);
  };

  /* ================= Instructions ================= */

  const addInstruction = () => {
    if (!instructionInput.trim()) return;

    setFormData((prev) => ({
      ...prev,
      generalInstructions: [
        ...prev.generalInstructions,
        instructionInput.trim(),
      ],
    }));

    setInstructionInput("");
  };

  const removeInstruction = (index) => {
    setFormData((prev) => ({
      ...prev,
      generalInstructions: prev.generalInstructions.filter(
        (_, i) => i !== index
      ),
    }));
  };

  /* ================= Rounds ================= */

  const addRule = () => {
    if (!currentRule.trim()) return;
    setRoundRules([...roundRules, currentRule.trim()]);
    setCurrentRule("");
  };

  const removeRule = (index) => {
    setRoundRules(roundRules.filter((_, i) => i !== index));
  };

  const addRound = () => {
    if (!roundTitle.trim()) return;

    const newRound = {
      roundNumber: formData.rounds.length + 1,
      title: roundTitle,
      description: roundDescription,
      rules: roundRules,
    };

    setFormData((prev) => ({
      ...prev,
      rounds: [...prev.rounds, newRound],
    }));

    setRoundTitle("");
    setRoundDescription("");
    setRoundRules([]);
  };

  const removeRound = (indexToRemove) => {
    const updatedRounds = formData.rounds
      .filter((_, index) => index !== indexToRemove)
      .map((round, index) => ({
        ...round,
        roundNumber: index + 1,
      }));

    setFormData((prev) => ({
      ...prev,
      rounds: updatedRounds,
    }));
  };

  /* ================= Submit ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bannerFile) {
      alert("Banner image is required");
      return;
    }

    if (formData.type === "group") {
      if (formData.minTeamSize > formData.maxTeamSize) {
        alert("Min team size cannot be greater than max team size");
        return;
      }
    }

    setLoading(true);

    try {
      const form = new FormData();

      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("type", formData.type);
      form.append("isOnlineSubmission", formData.isOnlineSubmission);

      if (formData.type === "group") {
        form.append("minTeamSize", formData.minTeamSize);
        form.append("maxTeamSize", formData.maxTeamSize);
      }

      const eventDateTime = new Date(
        `${formData.eventDate}T${formData.eventTime}`
      );
      form.append("eventDate", eventDateTime.toISOString());

      if (formData.isOnlineSubmission) {
        const deadlineDateTime = new Date(
          `${formData.onlineSubmissionDeadline}T${formData.deadlineTime}`
        );
        form.append(
          "onlineSubmissionDeadline",
          deadlineDateTime.toISOString()
        );
      }

      form.append("rounds", JSON.stringify(formData.rounds));
      form.append(
        "generalInstructions",
        JSON.stringify(formData.generalInstructions)
      );

      form.append("banner_image", bannerFile);

      const result = await addEvent(form);

      if (result.success) {
        alert("Event created successfully");
        resetForm();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "solo",
      minTeamSize: 1,
      maxTeamSize: 1,
      generalInstructions: [],
      rounds: [],
      isOnlineSubmission: false,
      eventDate: "",
      eventTime: "",
      onlineSubmissionDeadline: "",
      deadlineTime: "",
    });
    setBannerFile(null);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen text-white">
      <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-xl border border-white/10 space-y-8">

        <h1 className="text-3xl font-bold text-purple-400">
          Create New Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

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
            placeholder="Event Description"
            className="w-full p-3 bg-black/40 rounded-lg"
            required
          />

          {/* Banner */}
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="w-full p-3 bg-black/40 rounded-lg"
            required
          />

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
                type="number"
                name="minTeamSize"
                value={formData.minTeamSize}
                onChange={handleChange}
                className="p-3 bg-black/40 rounded-lg"
              />
              <input
                type="number"
                name="maxTeamSize"
                value={formData.maxTeamSize}
                onChange={handleChange}
                className="p-3 bg-black/40 rounded-lg"
              />
            </div>
          )}

          {/* Event Date */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="p-3 bg-black/40 rounded-lg"
              required
            />
            <input
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              className="p-3 bg-black/40 rounded-lg"
              required
            />
          </div>

          {/* Online Submission */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isOnlineSubmission"
              checked={formData.isOnlineSubmission}
              onChange={handleChange}
            />
            Enable Online Submission
          </label>

          {formData.isOnlineSubmission && (
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="onlineSubmissionDeadline"
                value={formData.onlineSubmissionDeadline}
                onChange={handleChange}
                className="p-3 bg-black/40 rounded-lg"
                required
              />
              <input
                type="time"
                name="deadlineTime"
                value={formData.deadlineTime}
                onChange={handleChange}
                className="p-3 bg-black/40 rounded-lg"
                required
              />
            </div>
          )}

          {/* Instructions */}
          <div className="space-y-3">
            <h3 className="text-purple-300">General Instructions</h3>
            <div className="flex gap-2">
              <input
                value={instructionInput}
                onChange={(e) => setInstructionInput(e.target.value)}
                className="flex-1 p-2 bg-black/40 rounded"
              />
              <button type="button" onClick={addInstruction} className="bg-purple-600 px-4 rounded">
                Add
              </button>
            </div>

            {formData.generalInstructions.map((ins, i) => (
              <div key={i} className="flex justify-between text-sm text-white/70">
                {ins}
                <button type="button" onClick={() => removeInstruction(i)} className="text-red-400">
                  remove
                </button>
              </div>
            ))}
          </div>

          {/* Rounds */}
          <div className="space-y-4">
            <h3 className="text-pink-400">Add Round</h3>

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

            <div className="flex gap-2">
              <input
                value={currentRule}
                onChange={(e) => setCurrentRule(e.target.value)}
                placeholder="Add Rule"
                className="flex-1 p-2 bg-black/40 rounded"
              />
              <button type="button" onClick={addRule} className="bg-purple-600 px-4 rounded">
                Add
              </button>
            </div>

            {roundRules.map((rule, i) => (
              <div key={i} className="flex justify-between text-sm text-white/60">
                {rule}
                <button type="button" onClick={() => removeRule(i)} className="text-red-400">
                  remove
                </button>
              </div>
            ))}

            <button type="button" onClick={addRound} className="bg-pink-600 px-4 py-2 rounded">
              Add Round
            </button>

            {formData.rounds.map((round, i) => (
              <div key={i} className="bg-black/40 p-3 rounded">
                <div className="flex justify-between">
                  <strong>{round.roundNumber}. {round.title}</strong>
                  <button onClick={() => removeRound(i)} type="button" className="text-red-400">
                    Delete
                  </button>
                </div>
                <p className="text-sm text-white/60">{round.description}</p>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
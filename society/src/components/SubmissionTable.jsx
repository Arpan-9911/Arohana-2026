export default function SubmissionTable({ data }) {

  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur">

      <table className="w-full text-left">
        <thead>
          <tr className="text-white/60">
            <th>Team / User</th>
            <th>Download</th>
          </tr>
        </thead>

        <tbody>
          {data.map(s => (
            <tr key={s._id} className="border-t border-white/10">
              <td>{s.registration?.teamName || s.registration?.user?.name}</td>
              <td>
                <a
                  href={`/api/society/download/${s._id}`}
                  className="text-primary"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

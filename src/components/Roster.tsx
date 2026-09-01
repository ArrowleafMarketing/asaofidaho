import type { BoardMember } from "@/data/leadership";

/**
 * TablePress-equivalent roster. The subcontractor board runs two-up
 * (`columns={2}`, filled left-to-right by row) and the associate board one-up,
 * exactly as tablepress-1 and tablepress-2 do on the live site.
 */
export function Roster({
  members,
  columns,
}: {
  members: BoardMember[];
  columns: 1 | 2;
}) {
  const rows: (BoardMember | null)[][] = [];
  for (let i = 0; i < members.length; i += columns) {
    const row: (BoardMember | null)[] = [];
    for (let c = 0; c < columns; c += 1) {
      row.push(members[i + c] ?? null);
    }
    rows.push(row);
  }

  return (
    <table className="roster">
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((member, cellIndex) =>
              member ? (
                <td key={member.name}>
                  <strong>{member.name}</strong>
                  <br />
                  {member.role}
                </td>
              ) : (
                <td key={`empty-${cellIndex}`} />
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

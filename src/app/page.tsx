import { db } from "../server/db"; // adjust path as needed
import type { MoistureLog } from "@prisma/client/wasm";

export default async function HomePage() {
  const logs = await db.moistureLog.findMany({
    orderBy: {timestamp: "desc"},
    take: 10,
  })

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🌱 Moisture Logs</h1>
      <ul className="space-y-2">
        {logs.map((log: MoistureLog) => (
          <li key={log.id}>
            {new Date(log.timestamp).toLocaleString()} - Moisture: {log.moisture}
          </li>
        ))}
      </ul>
    </div>
  );
}

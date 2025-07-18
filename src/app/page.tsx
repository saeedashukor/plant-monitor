export const dynamic = "force-dynamic";

import { db } from "../server/db";
import type { MoistureLog } from "@prisma/client";

export default async function HomePage() {
  const logs = await db.moistureLog.findMany({
    orderBy: { timestamp: "desc" },
    take: 10,
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🌱 Moisture Logs</h1>

      <ul className="space-y-4">
        {logs.map((log: MoistureLog) => (
          <li
            key={log.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">{log.name}</span>
              <span className="text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="text-gray-700">
                Moisture: <span className="font-mono">{log.moisture}</span>
              </span>

              <span
                className={`px-2 py-1 text-sm rounded-full font-medium ${
                  log.level === "Dry"
                    ? "bg-red-100 text-red-800"
                    : log.level === "Moist"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {log.level}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

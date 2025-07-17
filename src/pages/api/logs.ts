import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { moisture } = req.body;

    if (typeof moisture !== "number") {
        return res.status(400).json({error: "Moisture must be a number"});
    }

    await db.moistureLog.create({
        data: { moisture },
    });

    return res.status(200).json({status: "ok"});
}

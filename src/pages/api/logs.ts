import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { z } from "zod";
import { mapMoistureReading } from "~/utils/moistureReading";


const MoistureSchema = z.object({
  name: z.string().min(1),
  moisture: z.number().min(0).max(4095),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const parse = MoistureSchema.safeParse(req.body);

    if (!parse.success) {
        return res.status(400).json({error: "Invalid body"});
    }

    const { name, moisture } = parse.data;
    const level = mapMoistureReading(moisture);

    await db.moistureLog.create({
        data: {
            name,
            moisture,
            level,
        },
    });

    return res.status(200).json({status: "ok"});
}

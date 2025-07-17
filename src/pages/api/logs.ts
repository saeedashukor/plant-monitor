import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { z } from "zod";

const MoistureSchema = z.object({
  moisture: z.number(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const parse = MoistureSchema.safeParse(req.body);

    if (!parse.success) {
        return res.status(400).json({error: "Invalid body"});
    }

    const { moisture } = parse.data;
    await db.moistureLog.create({
        data: { moisture },
    });

    return res.status(200).json({status: "ok"});
}

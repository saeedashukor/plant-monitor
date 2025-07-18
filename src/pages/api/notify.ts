import type { NextApiRequest, NextApiResponse } from "next";
import { Expo, type ExpoPushTicket } from "expo-server-sdk";
import { z } from "zod";


const expo = new Expo();

const NotifySchema = z.object({
  token: z.string(),
  plant: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const parsed = NotifySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    const { token, plant } = parsed.data;

    if (!token || !Expo.isExpoPushToken(token)) {
        return res.status(400).json({ error: "Invalid Expo push token"});
    }

    const messages = [
        {
            to: token, 
            sound: "default",
            title: "Test notification",
            body: `This is a test alert for ${plant ?? "your plant"}.`,
            data: { plant },
        },
    ];

    try { 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: ExpoPushTicket[] = await expo.sendPushNotificationsAsync(messages);
        return res.status(200).json({ success: true, result });

    } catch(error) {
        console.error("Error sending notification", {messages, error});
        return res.status(500).json({ error: "Failed to send notification" });
    }
}
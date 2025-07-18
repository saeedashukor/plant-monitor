import type { NextApiRequest, NextApiResponse } from "next";
import { Expo, type ExpoPushTicket } from "expo-server-sdk";

const expo = new Expo();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { token, plant } = req.body;

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
        const result: ExpoPushTicket[] = await expo.sendPushNotificationsAsync(messages);
        return res.status(200).json({ success: true, result });

    } catch(error) {
        console.error("Error sending notification", {messages, error});
        return res.status(500).json({ error: "Failed to send notification" });
    }
}
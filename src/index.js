import 'dotenv/config';
import express from "express";

import { sendMessage } from './hooks/sendTelegram.js';
import { getClientIP, getCurrentDateAndTime, getUserAgent } from './utils.js';

const app = express();
const PORT = process.env.PORT || 3000;

const whitelistedIp = process.env.WHITELISTED_IP.split(',');

app.get('/details', async(req, res) => {
    const { animeId } = req.query;
    
    const ip = getClientIP(req);
    if (!whitelistedIp.includes(ip))
    {
        await sendMessage(
            `
            Opened:
            IP: ${ip}
            On: ${getCurrentDateAndTime()}
            From: ${getUserAgent(req)}
            Id:
            ${animeId}
            `
        );
    }

    res.sendStatus(200);

});

app.get('/watch', async(req, res) => {
    const { videoId } = req.query;

    const ip = getClientIP(req);
    if (!whitelistedIp.includes(ip))
    {
        await sendMessage(
            `
            Started Playing:
            IP: ${ip}
            On: ${getCurrentDateAndTime()}
            From: ${getUserAgent(req)}
            Playing:
            ${videoId}
            `
        );
    }
    
    res.sendStatus(200);

});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
export function getCurrentDateAndTime() {
    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };

    const currentDate = new Date();
    return currentDate.toLocaleString('en-IN', options);
}

export function getClientIP(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

export function getUserAgent(req) {
    const userAgent = req.get('User-Agent');
    const match = userAgent.match(/\((.*?)\)/);

    if (match && match[1]) {
        return match[1];
    } else {
        return "Unknown";
    }
}
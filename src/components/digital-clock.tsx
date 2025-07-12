"use client";

import { useState, useEffect } from 'react';

export function DigitalClock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const timeString = time ? time.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }) : '00:00:00';

    return (
        <div className="font-mono text-sm text-gray-400 w-[70px]">
            {time ? timeString : <span className="opacity-50">00:00:00</span>}
        </div>
    );
}

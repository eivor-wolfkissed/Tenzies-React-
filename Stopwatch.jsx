import React, { useEffect, useState } from 'react';

function Stopwatch({ isRunning, onTimeUpdate }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;
        if (isRunning) {
        interval = setInterval(() => {
                setTime(prevTime => {
                const newTime = prevTime + 1;
                onTimeUpdate(newTime);
                return newTime;
            });
        }, 1000);
        } else if(reset){
            setTime(0)
        }else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, reset]);

    return (
        <div className="stopwatch">
        <h2>Time: {time} s</h2>
        </div>
    );
}

export default Stopwatch;


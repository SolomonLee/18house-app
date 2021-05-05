import React, { useEffect, useRef } from "react";

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // 保存新回调
    useEffect(() => {
        savedCallback.current = callback;
    });

    // 建立 interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export const getDateString = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}/${
        date.getMonth() + 1
    }/${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

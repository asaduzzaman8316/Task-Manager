import React from 'react'
import { useEffect } from 'react';

function LoadFromLocal(props) {
    const { setTask } = props || {};

    useEffect(() => {
        // Load tasks stored with numeric keys (Date.now() used as key when saved)
        const loaded = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (/^\d+$/.test(key)) { // only numeric keys
                const raw = localStorage.getItem(key);
                let value = raw;
                try {
                    value = JSON.parse(raw);
                } catch {
                    // value stays as raw string
                }
                loaded.push({ id: Number(key), text: String(value) });
            }
        }
        // sort by id (timestamp) so older tasks appear first
        loaded.sort((a, b) => a.id - b.id);
        // set tasks once on mount
        if (typeof setTask === 'function') {
            setTask(loaded);
        }
    }, [setTask]);

    // component doesn't render UI; it only loads tasks on mount
    return null;

}

export default LoadFromLocal

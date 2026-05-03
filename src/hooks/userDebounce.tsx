import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Устанавливаем таймер
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay || 500); // По умолчанию 500мс

        // Очищаем таймер при изменении значения или delay
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

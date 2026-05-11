import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * @memberof module:Backend-Utils
 * @description
 * Custom hook that returns true when the viewport width is below the mobile breakpoint (768px). <br>
 * Automatically updates on window resize.
 * @returns {boolean} Whether the current viewport is considered mobile
 */
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(
        () => window.innerWidth < MOBILE_BREAKPOINT
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const handler = (e) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return isMobile;
}

export default useIsMobile;

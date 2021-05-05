import { useEffect, useRef, useState } from "react";

export const useWhenWindowResize = (cb) => {
    const refTimer = useRef(null);
    const handleResize = () => {
        clearTimeout(refTimer.current);
        refTimer.current = setTimeout(() => {
            requestAnimationFrame(() => {
                cb();
            });
        }, 100);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
};

export const useWhenWindowScroll = (cb) => {
    const refTimer = useRef(null);

    const handleScroll = () => {
        clearTimeout(refTimer.current);
        refTimer.current = setTimeout(() => {
            requestAnimationFrame(() => {
                cb();
            });
        }, 10);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
};

export const useWindowScrollY = () => {
    const refScrollY = useRef(0);
    // const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        const timestamp = new Date().getTime();
        if (
            window.useWindowScrollYLogTime != "undefined" &&
            timestamp - window.useWindowScrollYLogTime < 10
        ) {
            // setScrollY(window.useWindowScrollY);
            refScrollY.current = window.useWindowScrollY;
            return;
        }

        window.useWindowScrollY = window.scrollY;
        window.useWindowScrollYLogTime = timestamp;
        // setScrollY(window.useWindowScrollY);
        refScrollY.current = window.useWindowScrollY;
    };

    useWhenWindowScroll(handleScroll);

    return refScrollY;
};

// export const useScrollHeightOverFlow = (ref) => {
// };

export const useGetHeight = (ref) => {
    const [height, setHeight] = useState(0);
    const refIsMount = useRef(false);

    useEffect(() => {
        refIsMount.current = true;
        return () => {
            refIsMount.current = false;
        };
    }, []);

    useWhenWindowResize(() => {
        if (refIsMount.current) {
            setHeight(ref.current.offsetHeight);
        }
    });
    return height;
};

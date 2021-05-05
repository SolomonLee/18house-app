import { useState, useEffect, useCallback, useRef } from "react";
import {
    useWhenWindowResize,
    useWhenWindowScroll,
    useWindowScrollY,
} from "../hook/elementHook";

const SocialFlowBox = () => {
    const [position, setPosition] = useState("bottom");
    const footerHeight = useRef(0);
    const refFooter = useRef(null);
    const refIsMounted = useRef(false);
    const refFooterSplitItem = useRef(null);
    const windowScrollY = useWindowScrollY();

    const handlerResize = () => {
        requestAnimationFrame(() => {
            const maxScroll =
                document.body.offsetHeight -
                (refFooter.current.offsetHeight -
                    refFooterSplitItem.current.offsetHeight -
                    20) -
                window.innerHeight;

            if (maxScroll < 0) footerHeight.current = 0;
            else footerHeight.current = maxScroll;
        });
    };

    const handlerScroll = () => {
        requestAnimationFrame(() => {
            if (windowScrollY.current > footerHeight.current) {
                setPosition("bottom");
            } else {
                setPosition("left");
            }
        });
    };

    useWhenWindowResize(() => {
        handlerResize();
    });

    useWhenWindowScroll(() => {
        handlerScroll();
    });

    useEffect(() => {
        refIsMounted.current = true;
        refFooter.current = document.querySelector("footer");
        refFooterSplitItem.current = refFooter.current.querySelector(
            ".split_item"
        );

        handlerResize();

        const autoScannerTimer = setInterval(() => {
            if (refIsMounted.current) {
                handlerResize();
                handlerScroll();
            } else {
                clearInterval(autoScannerTimer);
            }
        }, 1000);

        return () => {
            refIsMounted.current = false;
            clearInterval(autoScannerTimer);
        };
    }, []);

    return (
        <div className="socialflow_box" position={position}>
            <div className="box_content">
                <a
                    href="https://www.facebook.com/%E7%86%8A%E6%9D%91%E8%8E%8A%E5%89%B5%E8%97%9D%E5%B7%A5%E5%9D%8A-111717077626555/?modal=admin_todo_tour&notif_id=1613986852741884&notif_t=page_invite&ref=notif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn_style_none btn_link"
                >
                    <img src="/img/fb_black.svg" alt="" />
                </a>
            </div>
        </div>
    );
};

export default SocialFlowBox;

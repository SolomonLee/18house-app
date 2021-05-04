import { useState, useEffect, useCallback, useRef } from "react";

const SocialFlowBox = () => {
  const [position, setPosition] = useState("bottom");
  const footerHeight = useRef(0);
  const scannerFooterHeight = useRef(null);
  const refTimerScorll = useRef(null);
  const refTimerResize = useRef(null);
  const refFooter = useRef(null);
  const refFooterSplitItem = useRef(null);

  const handlerResize = useCallback(() => {
    clearTimeout(refTimerResize.current);
    refTimerResize.current = setTimeout(() => {
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
    }, 150);
  }, []);

  const handlerScroll = useCallback(() => {
    clearTimeout(refTimerScorll.current);
    refTimerScorll.current = setTimeout(() => {
      requestAnimationFrame(() => {
        if (window.scrollY > footerHeight.current) {
          setPosition("bottom");
        } else {
          setPosition("left");
        }
      });
    }, 50);
  }, []);

  useEffect(() => {
    refFooter.current = document.querySelector("footer");
    refFooterSplitItem.current = refFooter.current.querySelector(".split_item");

    handlerResize();
    let is_mounted = true;

    const autoScannerFooterHeight = () => {
      clearTimeout(scannerFooterHeight.current);
      if (is_mounted) {
        scannerFooterHeight.current = setTimeout(() => {
          handlerResize();
          handlerScroll();
          autoScannerFooterHeight();
        }, 1000);
      }
    };

    autoScannerFooterHeight();

    window.addEventListener("scroll", handlerScroll);
    window.addEventListener("resize", handlerResize);
    return () => {
      is_mounted = false;
      clearTimeout(scannerFooterHeight.current);
      window.removeEventListener("resize", handlerResize);
      window.removeEventListener("scroll", handlerScroll);
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

import { useState, useEffect, useCallback, useRef } from "react";

const SocialFlowBox = (props) => {
  const [position, setPosition] = useState("bottom");
  const footerHeight = useRef(0);
  const scannerFooterHeight = useRef();

  const handleResize = useCallback(() => {
    const maxScroll =
      document.body.offsetHeight -
      document.querySelector("footer").offsetHeight -
      window.innerHeight +
      40;

    if (maxScroll < 0) footerHeight.current = 0;
    else footerHeight.current = maxScroll;

    clearTimeout(scannerFooterHeight.current);
    setTimeout(() => {
      handleResize();
      handleScroll();
    }, 1000);
  });

  const handleScroll = useCallback(() => {
    if (window.scrollY > footerHeight.current) {
      setPosition("bottom");
    } else {
      setPosition("left");
    }
  });

  useEffect(() => {
    handleResize();

    window.addEventListener("scroll", handleScroll);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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

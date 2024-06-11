import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Tooltip = ({ children, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const childRef = useRef(null);

  const handleMouseEnter = () => {
    const rect = childRef.current.getBoundingClientRect();
    setTooltipStyle({
      top: rect.height,
      left: rect.width,
      // right: window.innerWidth,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  console.log(description);
  console.log(tooltipStyle);

  return (
    <div
      className="relative flex "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={childRef} className=" flex-1">
        {children}
      </div>
      {isHovered && (
        <div
          className="absolute bg-black text-white p-2 rounded-md z-10 w-fit text-nowrap"
          style={{
            top: `${tooltipStyle.top}px`,
            left: `${tooltipStyle.left}px`,
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
};

export default Tooltip;

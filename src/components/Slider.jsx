import React, { useEffect, useState } from "react";

function Slider({ components, visibleSlides = 3, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setIndex(
        (prevIndex) => (prevIndex + 1) % (components.length - visibleSlides + 1)
      );
    }, interval);
    return () => clearInterval(sliderInterval);
  }, [components, interval, visibleSlides]);
  const visibleComponents = components.slice(index, index + visibleSlides);
  return (
    <div className="overflow-hidden">
      <div className="flex gap-x-2 transition-transform duration-500 ease-in-out">
        {visibleComponents.map((component, idx) => (
          <div key={idx} className="">
            {component}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;

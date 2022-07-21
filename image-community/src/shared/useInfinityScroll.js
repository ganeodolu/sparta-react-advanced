import React, { useState, useEffect, useCallback } from "react";

const defaultOption = {
	root: null,
	threshold: 0.5,
	rootMargin: "0px",
};

const useInfinityScroll = (onIntersect, option) => {
  const [ref, setRef] = useState(null);
  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      onIntersect(entry, observer)
    }
  }, [])
  
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...defaultOption,
        ...option
      })
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect])
  return [ref, setRef]
}

export default useInfinityScroll

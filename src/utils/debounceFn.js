const deBounceFn =  (fn, delay) => {
  let timer = null;
  const deBouncedFn = (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
      return;
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay)
  }
  return deBouncedFn;
}

export default deBounceFn;
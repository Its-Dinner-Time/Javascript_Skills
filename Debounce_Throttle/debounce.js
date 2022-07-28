// debounce :
//    => user interaction이 끝나고 지정한 시간이 지난 후 action이 발생하도록

function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export { debounce };

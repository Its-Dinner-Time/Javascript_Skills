// throttle :
//    => 지정한 시간마다 action이 발생하도록

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs = null;
  const timeout = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeout, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(timeout, delay);
  };
}

export { throttle };

document.addEventListener('DOMContentLoaded', App);

async function App() {
  const debounce = document.querySelector('button[data-type="debounce"]');
  const throttle = document.querySelector('button[data-type="throttle"]');
  const section = document.querySelector('section#testSection');

  debounce.addEventListener('click', () => callDebounceApp(section));
  throttle.addEventListener('click', () => callThrottleApp(section));
}

async function callDebounceApp(wrapper) {
  wrapper.innerHTML = '';
  const { debounce } = await import('./debounce.js');

  const { inputEl, showInputResultText } = testSectionInputEvent(wrapper, 'debounce');
  const debounceInputImpl = debounce((text) => (showInputResultText.textContent = text));
  inputEl.addEventListener('input', (e) => debounceInputImpl(e.target.value));

  let increseMent = 0;
  const mouseIncreseMent = testSectionMouseEvent(wrapper, 'debounce');
  const debounceMouseImpl = debounce(() => (mouseIncreseMent.textContent = ++increseMent));
  document.addEventListener('mousemove', (e) => debounceMouseImpl());
}
async function callThrottleApp(wrapper) {
  wrapper.innerHTML = '';
  const { throttle } = await import('./throttle.js');

  const { inputEl, showInputResultText } = testSectionInputEvent(wrapper, 'throttle');
  const throttleImpl = throttle((text) => (showInputResultText.textContent = text));
  inputEl.addEventListener('input', (e) => throttleImpl(e.target.value));

  let increseMent = 0;
  const mouseIncreseMent = testSectionMouseEvent(wrapper, 'throttle');
  const throttleMouseImpl = throttle(() => (mouseIncreseMent.textContent = ++increseMent));
  document.addEventListener('mousemove', (e) => throttleMouseImpl());
}

function testSectionInputEvent(wrapper, type) {
  const inputEl = document.createElement('input');
  const defaultInputResult = document.createElement('h1');
  const defaultInputResultText = document.createElement('span');
  const showInputResult = document.createElement('h1');
  const showInputResultText = document.createElement('span');

  wrapper.append(inputEl, defaultInputResult, showInputResult);

  defaultInputResult.textContent = 'Default: ';
  defaultInputResult.append(defaultInputResultText);
  inputEl.addEventListener('input', (e) => (defaultInputResultText.textContent = e.target.value));

  showInputResult.textContent = `${type === 'debounce' ? 'Debounce Text: ' : 'Throttle Text: '}`;
  showInputResult.append(showInputResultText);
  return { inputEl, showInputResultText };
}

function testSectionMouseEvent(wrapper, type) {
  let increseMent = 0;

  const defaultInputResult = document.createElement('h1');
  const defaultInputResultText = document.createElement('span');
  const showInputResult = document.createElement('h1');
  const showInputResultText = document.createElement('span');

  defaultInputResult.textContent = 'Default Mouse: ';
  defaultInputResult.append(defaultInputResultText);
  showInputResult.textContent = `${type === 'debounce' ? 'Debounce Mouse: ' : 'Throttle Mouse: '}`;
  showInputResult.append(showInputResultText);

  wrapper.append(defaultInputResult, showInputResult);
  document.addEventListener('mousemove', (e) => (defaultInputResultText.textContent = ++increseMent));

  return showInputResultText;
}

const on = (eventType: string, listener: EventListenerOrEventListenerObject): void => {
  document.addEventListener(eventType, listener);
}

const off = (eventType: string, listener: EventListenerOrEventListenerObject): void => {
  document.removeEventListener(eventType, listener);
}

const once = (eventType: string, listener: EventListener): void => {
  on(eventType, handleEventOnce);

  function handleEventOnce(event: Event) {
    listener(event);
    off(eventType, handleEventOnce);
  }
}

const trigger = (eventType: string, data?: unknown): void => {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

export { on, once, off, trigger };

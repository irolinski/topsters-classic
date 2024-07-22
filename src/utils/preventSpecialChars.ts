
export const preventSpecialChar = (evt: any) => {
  if (!/[A-Za-z0-9\s_,. ()?!-']/.test(evt.key)) {
    evt.preventDefault();
  }
};
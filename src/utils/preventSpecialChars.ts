
export const preventSpecialChar = (evt: React.KeyboardEvent<HTMLInputElement>) => {
  if (!/[A-Za-z0-9\s_,. - ()?!'-]/.test(evt.key)) {
    evt.preventDefault();
  }
};
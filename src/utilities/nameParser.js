export const parseName = (name) => {
  const parsed = name
    .split("")
    .map((char, i) => (!i ? cart.toUpperCase() : char.toLowerCase()))
    .join("");
  return parsed;
};

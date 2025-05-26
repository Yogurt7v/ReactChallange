export function getTodaysDate() {
  const date = new Date();
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
}

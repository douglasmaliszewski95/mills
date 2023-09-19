function generateRandomNumber() {
  return Math.floor(Math.random() * 10);
}

export function generateRandomSequence() {
  let sequence = "";
  for (let i = 0; i < 7; i++) {
    sequence += generateRandomNumber();
  }
  return sequence;
}

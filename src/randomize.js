export const repeatArray = (arr, count) => {
  const ln = arr.length;
  let b = [];

  for (let i=0; i<count; i++) {      
    b.push(arr[i%ln]);      
  }
      
  return b;      
};

/* random int between min and max inclusive. */
export const randomInt = (min, max) => 
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomElement = arr => arr[randomInt(0, arr.length-1)];

export const shuffleArray = arr => arr
  .map(a => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map(a => a[1]);

export const randomSequence = (items, length) => shuffleArray(repeatArray(items, length));

export const pick_unique_two = arr => {
  const fst_idx = randomInt(0, arr.length-1);
  const fst = arr[fst_idx];
  const snd = randomElement(arr.slice(0, fst_idx).concat(arr.slice(fst_idx+1, arr.length)));
  return [fst, snd];
};

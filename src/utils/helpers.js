export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  // console.log(unique);
  // console.log(data);
  // console.log(type);
  if (type === "colors") {
    // flat() is method creates a new array with sub-array elements concatenated into it recursively up to the specified depth
    // we use flat() for colors because colors contain arrays so we need to flat them.
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};

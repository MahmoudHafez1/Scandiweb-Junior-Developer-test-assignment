const compareAttributes = (attributes1, attributes2) => {
  if (attributes1.length !== attributes2.length) return false;
  let result = true;
  attributes1.forEach((attr1) => {
    const attr2 = attributes2.find((attr2) => attr1.name === attr2.name);
    if (!attr2 || attr1.value !== attr2.value) {
      result = false;
      return;
    }
  });
  return result;
};

export default compareAttributes;

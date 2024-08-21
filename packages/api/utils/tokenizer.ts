function Tokenizer(minGram = 1, maxGram = 8, separator = " ") {
  return function tokenize(str: string) {
    return str.split(separator).reduce((acc: string[], token) => {
      for (let i = minGram; i <= maxGram && i <= token.length; ++i) {
        acc = [...acc, token.slice(0, i).toLowerCase()];
      }

      return acc;
    }, []);
  };
}

export { Tokenizer };

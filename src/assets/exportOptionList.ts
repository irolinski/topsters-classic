const exportOptionList = [
  {
    name: "High (.png)",
    value: `${JSON.stringify({
      format: "image/png",
      quality: 1.0,
    })}`,
  },
  {
    name: "High (.jpeg)",
    value: `${JSON.stringify({
      format: "image/jpeg",
      quality: 1.0,
    })}`,
  },
  {
    name: "Medium (.jpeg)",
    value: `${JSON.stringify({
      format: "image/jpeg",
      quality: 0.5,
    })}`,
  },
  {
    name: "Low (.jpeg)",
    value: `${JSON.stringify({
      format: "image/jpeg",
      quality: 0.1,
    })}`,
  },
];

export default exportOptionList;

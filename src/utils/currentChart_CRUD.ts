export const saveCurrentChart = (name: string) => {
  let currentChart = JSON.parse(localStorage.getItem("currentChart") ?? "{}");
  currentChart.name = name;
  localStorage.setItem(`${name}`, currentChart || "{}");
};

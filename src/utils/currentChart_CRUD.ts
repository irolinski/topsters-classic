export const saveCurrentChart = (name: string) => {
  let currentChart = JSON.parse(localStorage.getItem("currentChart") ?? "{}");
  currentChart.name = name;

  if (currentChart.tableMode === "top40") {
    delete currentChart.top100Data;
    delete currentChart.collageData;
  }

  if (currentChart.tableMode === "top100") {
    delete currentChart.top40Data;
    delete currentChart.collageData;
  }

  if (currentChart.tableMode === "collage") {
    delete currentChart.top40Data;
    delete currentChart.top100Data;
  }

  currentChart = JSON.stringify(currentChart);
  localStorage.setItem(`${name}`, currentChart);
};

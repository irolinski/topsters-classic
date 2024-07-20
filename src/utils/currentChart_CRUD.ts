export const saveCurrentChart = (currentChart: any) => {
  const selectedChartName = sessionStorage.getItem("selectedChart") ?? "{}";
  let savedChart = JSON.parse(
    localStorage.getItem(selectedChartName ?? "") ?? "{}"
  );

  if (!savedChart.name) {
    savedChart.name = selectedChartName;
  }

  if (savedChart.tableMode === "top40") {
    delete savedChart.top100Data;
    delete savedChart.collageData;
  }

  if (savedChart.tableMode === "top100") {
    delete savedChart.top40Data;
    delete savedChart.collageData;
  }

  if (savedChart.tableMode === "collage") {
    delete savedChart.top40Data;
    delete savedChart.top100Data;
  }

  savedChart = JSON.stringify(savedChart);
  localStorage.setItem(selectedChartName, currentChart);
};

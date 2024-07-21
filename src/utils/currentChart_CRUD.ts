import { defaultChart } from "../assets/emptyCharts";

export const saveCurrentChart = (newChartName: string) => {
  const selectedChartName = sessionStorage.getItem("selectedChart");

  let savedChart = JSON.parse(
    localStorage.getItem(`${selectedChartName}`) ?? "{}",
  );

  if (!savedChart.name) {
    savedChart.name = selectedChartName;
  }

  // delete unused data

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
  localStorage.setItem(`${newChartName}`, savedChart);
  sessionStorage.setItem("selectedChart", `${newChartName}`);
  localStorage.setItem("newChart", JSON.stringify(defaultChart))
  window.location.reload();
};

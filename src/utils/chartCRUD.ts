import { defaultChart } from "../assets/emptyCharts";

export const saveCurrentChart = async (newChartName: string) => {
  try {
    const selectedChartName = sessionStorage.getItem("selectedChart");

    let savedChart = JSON.parse(
      localStorage.getItem(`${selectedChartName}`) ?? "{}",
    );
    let emptyChart;

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
    emptyChart = JSON.stringify(defaultChart);

    // for some reason double JSON.stringify'ing emptychart fixes the bug
    // that leaves selected items in newChart instead of erasing them on first save

    localStorage.setItem(`${newChartName}`, savedChart);
    localStorage.setItem("newChart", JSON.stringify(emptyChart));
    sessionStorage.setItem("selectedChart", `${newChartName}`);
    window.location.reload();
  } catch (err) {
    alert(
      "Sorry, it seems an error has occured. Check browser console for details.",
    );
    err instanceof Error && console.log(err.message);
  }
};

export const deleteCurrentChart = () => {
  try {
    const selectedChartName = sessionStorage.getItem("selectedChart");
    const allChartNames: string[] = Object.keys(localStorage);
    const deletedChartIndex: number = allChartNames.indexOf(
      `${selectedChartName}`,
    );
    localStorage.removeItem(`${selectedChartName}`);
    sessionStorage.removeItem(`${selectedChartName}`);
    sessionStorage.setItem(
      "selectedChart",
      `${allChartNames[deletedChartIndex + 1]}`,
    );
    window.location.reload();
  } catch (err) {
    alert(
      "Sorry, it seems an error has occured. Check browser console for details.",
    );
    err instanceof Error && console.log(err.message);
  }
};

import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./chartdisplay.css";
const Chartdisplay = () => {
  const data = {
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24,
    ],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Popularity of colours",
        data: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24,
        ],
        // you can set indiviual colors for each bar
        // backgroundColor: [
        //   "rgba(255, 255, 255, 0.6)",
        //   "rgba(255, 255, 255, 0.6)",
        //   "rgba(255, 255, 255, 0.6)",
        // ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
export default Chartdisplay;

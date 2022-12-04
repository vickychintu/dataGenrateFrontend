import Chart from "chart.js/auto";
import { Bar, Scatter } from "react-chartjs-2";
import React, { useState } from "react";
import "./chartdisplay.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
const Chartdisplay = () => {
  const [date, setDate] = useState(new Date());
  const [scattD, setScattD] = useState([]);
  const [madeTemplate, setMadeTempalte] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [spanData, setSpanData] = useState([]);
  const [dispersion, setDispersion] = useState([]);
  const [currentGraph, setCurrentGraph] = useState(0);
  const [genratedTemplate, setGenratedTemplate] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [waitTime, setWaitTime] = useState();
  const [orderTime, setOrderTime] = useState(1);
  const [displayGraph, setDisplayGraph] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [tempName, setTempName] = useState();
  const [graphType, setGraphType] = useState(["Arrival Graph"]);
  const [templateName, setTemplateName] = useState();
  const [templateId, setTemplateId] = useState();
  const data1 = {
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24,
    ],
    datasets: [
      {
        label: "Hourly orders",
        data: madeTemplate,
        backgroundColor: [
          "rgba(190, 80, 120)",
          "rgba(78, 245, 39, 0.8)",
          "rgba(23, 31, 8, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [maxScale, setMaxScale] = useState(90);
  const data = {
    labels: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    datasets: [
      {
        label: "hour of the day",
        // data: genratedTemplate[currentGraph],
        data: displayGraph,
        backgroundColor: [
          "rgba(190, 80, 120)",
          "rgba(78, 245, 39, 0.8)",
          "rgba(23, 31, 8, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };
  var hourArray = [];
  const upadateTempalteName = (event) => {
    setTemplateName(event.target.value);
  };
  const getTempalateData = () => {
    if (!templateName) {
      alert("template nmae is required");
    }
    axios
      .post("http://35.154.31.9:8005/getTempalteData", {
        templateName: templateName,
      })
      .then((response) => {
        console.log(response);
        setMadeTempalte(response.data[0]["templateArray"]);
        hourArray = response.data[0]["hourArray"];
        setCurrentGraph(0);
        setGenratedTemplate(response.data[0]["hourArray"]);
        setDisplayGraph(response.data[0]["hourArray"][0]);
        setDate(new Date(response.data[0]["startDate"]));
        setSpanData(response.data[0]["spanData"]);
        setDispersion(response.data[0]["completeDispersionData"]);
        setGraphType("Arrival Graph");
        setMaxScale(maximizeArray(response.data[0]["hourArray"][0]));
        setTemplateId(response.data[0]["_id"]);
        axios
          .post("http://35.154.31.9:8005/interHourDataV2", {
            hourArray: response.data[0]["completeDispersionData"][0],
            spanData: response.data[0]["spanData"][0],
          })
          .then((response2) => {
            setScattD(response2.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadLeftGraph = () => {
    if (currentGraph > 0) {
      setCurrentGraph(currentGraph - 1);
      setDisplayGraph(genratedTemplate[currentGraph - 1]);
      const preDate = new Date(date);
      setGraphType("Arrival Graph");
      preDate.setDate(preDate.getDate() - 1);
      setMaxScale(maximizeArray(genratedTemplate[currentGraph - 1]));
      setDate(preDate);

      console.log("printing dispersion data", dispersion[currentGraph - 1]);
      axios
        .post("http://35.154.31.9:8005/interHourDataV2", {
          hourArray: dispersion[currentGraph - 1],
          spanData: spanData[currentGraph - 1],
        })
        .then((response2) => {
          setScattD(response2.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const loadRightGraph = () => {
    if (currentGraph < genratedTemplate.length - 1) {
      setCurrentGraph(currentGraph + 1);
      setDisplayGraph(genratedTemplate[currentGraph + 1]);
      setGraphType("Arrival Graph");
      setMaxScale(maximizeArray(genratedTemplate[currentGraph + 1]));
      const preDate = new Date(date);
      preDate.setDate(preDate.getDate() + 1);
      setDate(preDate);
      console.log("printing dispersion data", dispersion[currentGraph + 1]);
      axios
        .post("http://35.154.31.9:8005/interHourDataV2", {
          hourArray: dispersion[currentGraph + 1],
          spanData: spanData[currentGraph + 1],
        })
        .then((response2) => {
          setScattD(response2.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const swapGraph = () => {
    if (graphType == "Arrival Graph") {
      if (!waitTime) {
        alert("waitTime is required to generate orders graph");
        return;
      }
      if (!orderTime) {
        alert("orderTime is required to generate orders graph");
        return;
      }
      axios
        .post("http://35.154.31.9:8005/interHourOrderData", {
          hourArray: dispersion[currentGraph],
          spanData: spanData[currentGraph],
          waitTime,
          orderTime,
        })
        .then((response2) => {
          setGraphType("Orders Graph");
          console.log(response2);
          setScattD(response2.data.interHourArray);
          setDisplayGraph(response2.data.orderHourArray);
        })
        .catch((err) => console.log(err));
      return;
    } else {
      setGraphType("Arrival Graph");
      axios
        .post("http://35.154.31.9:8005/interHourDataV2", {
          hourArray: dispersion[currentGraph],
          spanData: spanData[currentGraph],
        })
        .then((response2) => {
          console.log(response2);
          setScattD(response2.data);
          setDisplayGraph(genratedTemplate[currentGraph]);
        })
        .catch((err) => console.log(err));
    }
  };
  const genrateOrderGraph = () => {
    if (graphType == "Orders Graph") {
      if (!waitTime) {
        alert("waitTime is required to generate orders graph");
        return;
      }
      if (!orderTime) {
        alert("orderTime is required to generate orders graph");
        return;
      }
      axios
        .post("http://35.154.31.9:8005/interHourOrderData", {
          hourArray: dispersion[currentGraph],
          spanData: spanData[currentGraph],
          waitTime,
          orderTime,
        })
        .then((response2) => {
          console.log(response2);
          setScattD(response2.data.interHourArray);
          setDisplayGraph(response2.data.orderHourArray);
        })
        .catch((err) => console.log(err));
      return;
    }
  };
  const optionsSactter = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const settingTemplate = (e) => {
    setTempName(e.target.value);
  };
  const scatterData = {
    datasets: [
      {
        label: "hour distribution",
        data: scattD,
      },
    ],
  };
  const settingOrderTime = (e) => {
    setOrderTime(e.target.value);
  };
  const settingWaitingTime = (e) => {
    setWaitTime(e.target.value);
  };
  const saveSpecficTemplate = () => {
    if (!tempName) {
      alert("template  name is required");
    }
    if (graphType == "Orders Graph") {
      if (waitTime && orderTime) {
        axios
          .post("http://35.154.31.9:8005/savesubTemplate", {
            hourArray: dispersion[currentGraph],
            spanData: spanData[currentGraph],
            tempName,
            waitTime,
            orderTime,
            templateId,
            dateOffest: currentGraph,
          })
          .then((res) => alert("save successfull"))
          .catch((e) => {
            alert("error saving");
          });
      }
    } else {
      alert("could not save");
    }
  };
  return (
    <>
      <div className="serchBox">
        <input
          type="text"
          className="templateBox"
          placeholder="Template Name"
          onChange={upadateTempalteName}
        ></input>
        <button className="submitButton" onClick={getTempalateData}>
          Submit
        </button>
      </div>

      <div className="multi-chart-container">
        <div className="chart-container">
          <h2 style={{ textAlign: "center" }}>Hourly Distribution</h2>
          <Scatter
            data={scatterData}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (ctx) => {
                      console.log(scattD[ctx.dataIndex]);
                      return `json:- ${scattD[ctx.dataIndex]["z"]},time:-${
                        scattD[ctx.dataIndex]["y"]
                      }`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  min: 0,
                  max: 23,
                  ticks: {
                    stepSize: 1,
                  },
                },
                y: {
                  min: 0,
                  max: 60,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>
        <div className="chart-container">
          <h2 style={{ textAlign: "center" }}>Generated Graph</h2>
          <Bar
            data={data}
            plugins={[ChartDataLabels]}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: " generated pattern",
                },
                legend: {
                  display: true,
                  display: "bottom",
                },

                datalabels: {
                  display: true,
                  color: "black",
                  formatter: Math.round,
                  anchor: "end",
                  offset: -20,
                  align: "start",
                },
              },
              scales: {
                y: {
                  min: 0,
                  max: maxScale,
                  ticks: {
                    stepSize: 10,
                  },
                },
              },
            }}
          />
          <div className="dateandarrows">
            <button onClick={loadLeftGraph}>
              <ChevronLeftIcon />
            </button>
            {`${date.toLocaleDateString()}`}
            <button onClick={loadRightGraph}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
      <div></div>
      <div className="switchGraphTypes">
        <div className="controlBox">
          <div>
            <div className="orderServingTime">
              <input
                type={"number"}
                onChange={settingOrderTime}
                placeholder={"order Time in seconds"}
                min={1}
                max={300}
              />
            </div>
            <div className="waitingTime">
              <input
                type={"number"}
                onChange={settingWaitingTime}
                placeholder={"wait Time in s"}
                min={1}
                max={300}
              />
              {graphType == "Orders Graph" ? (
                <button onClick={genrateOrderGraph}>Generate</button>
              ) : null}
            </div>
            {graphType == "Orders Graph" ? (
              <div className="templateName">
                <input
                  className="templateInput"
                  type="text"
                  id="templateName"
                  placeholder="ex:-template type 1"
                  onChange={settingTemplate}
                ></input>
                <div>
                  <button onClick={saveSpecficTemplate}>Save</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div>{`${graphType}`}</div>
        <button className="swapButton" onClick={swapGraph}>
          <SwapHorizontalCircleIcon />
        </button>
      </div>
    </>
  );
};

const maximizeArray = (array) => {
  let max = -Infinity;
  array.map((x) => {
    if (x > max) {
      max = x;
    }
  });
  return 10 * Math.ceil(max / 10);
};
export default Chartdisplay;

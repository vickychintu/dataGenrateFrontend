import Graph from "../Graph";
import "./dashBoard.css";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { LineAxisOutlined } from "@mui/icons-material";
const Dashboard = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [template, setTemplate] = useState();
  const [loading, setLoading] = useState(false);
  const [loadMessage, setLoadMessage] = useState(1);
  const [lockedColumn, setLockedColumn] = useState(
    Array.from({ length: 24 }, (v, k) => 0)
  );
  const [endPoint, setEndPoint] = useState("");
  const [orderTime, setOrderTime] = useState(1);
  const [waitTime, setWaitTime] = useState();
  const formData = new FormData();
  const [file, setFile] = useState();
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const settingLockedColumn = (value) => {
    setLockedColumn(value);
  };
  const [weekArray, setWeekArray] = useState([0, 0, 0, 0, 0, 0, 0]);
  const settingWeekArray = (val) => {
    const volumeValue = val.target.value;
    console.log(val.target.id);
    let index = val.target.id;
    index = parseInt(index.slice(0, 1));
    setWeekArray((oldArray) => {
      const newArray = [...oldArray];
      newArray[index] = volumeValue;
      console.log(weekArray);
      return newArray;
    });
  };
  const onChange = (dateArray) => {
    console.log(startDate, endDate);
    setStartDate(dateArray[0]);
    setEndDate(dateArray[1]);
    console.log(startDate, endDate);
  };
  const settingTemplate = (event) => {
    setTemplate(event.target.value);
  };
  const genrateData = () => {
    if (!template) {
      alert("template name is required");
      return;
    }
    if (!startDate || !endDate) {
      alert("date range is required");
      return;
    }
    if (checkZero(lockedColumn)) {
      alert("draw graph pattern");
      return;
    }
    if (!file) {
      alert("json uplaod is compulsory");
    }
    formData.append("file", file);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("weekArray", JSON.stringify(weekArray));
    formData.append("hourData", JSON.stringify(lockedColumn));
    formData.append("template", template);
    formData.append("apiEndPoint", endPoint);
    formData.append("orderTime", orderTime);
    formData.append("waitTime", waitTime);
    console.log("trying to send data");
    setLoading(true);
    axios
      .post("http://35.154.31.9:8005/generateData", formData)
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          setLoadMessage(2);
        } else if (response.status == 204) {
          setLoadMessage(3);
        } else {
          setLoadMessage(4);
        }
        setTimeout(() => {
          setLoading(false);
          setLoadMessage(1);
        }, 3000);
      })
      .catch((err) => {
        console.log("got no response");
        console.log(err);
      });
  };
  const checkZero = (arr) => {
    return arr.every((element) => element === 0);
  };
  const settingEndPoint = (e) => {
    setEndPoint(e.target.value);
  };
  const settingOrderTime = (e) => {
    setOrderTime(e.target.value);
  };
  const settingWaitingTime = (e) => {
    setWaitTime(e.target.value);
  };
  return (
    <>
      {loading ? (
        <div className="loadingSection">{lodeMessage(loadMessage)}</div>
      ) : null}
      <div className="dashboard">
        <Graph
          setLockedColumn={settingLockedColumn}
          lockedColumn={lockedColumn}
          settingWeekArray={settingWeekArray}
        />
        <div className="leftSection">
          <div className="calenderSection">
            <Calendar onChange={onChange} selectRange={true} />
          </div>
          <div className="templateName">
            <input
              className="templateInput"
              type="text"
              id="templateName"
              placeholder="ex:-template type 1"
              onChange={settingTemplate}
            ></input>
          </div>
          <div className="apiInputSection">
            <input
              type={"text"}
              onChange={settingEndPoint}
              placeholder={"api:-http://xyz.com/abc/mbd"}
            />
          </div>

          <div className="fileUplaodSection">
            <input type="file" onChange={handleFileChange} accept=".json" />
          </div>
          <div className="genratesection">
            <button onClick={genrateData} className="generateButton">
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const lodeMessage = (type) => {
  switch (type) {
    case 1:
      return (
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
      break;
    case 2:
      return <div className="messageText">Data genrated successfully</div>;
      break;
    case 3:
      return <div className="messageText">Tempalte name already exists</div>;
      break;
    default:
      return (
        <div className="messgeText">unable to generate data try again</div>
      );
      break;
  }
};
export default Dashboard;

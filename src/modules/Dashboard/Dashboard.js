import { Avatar, Chip } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import bg from "./bg.jpg";
import Countdown from "./components/Countdown";
import "./Dashboard.css";
import heart from "./heart.png";



class Dashboard extends React.Component {

  render() {
    return (
      <div className="ui container" style={{textAlign: "center", position: "relative"}}>
        <div className="Dashboard" style={{backgroundImage: "url(" + bg + ")"}}>
          <div className="DashboardContent">

            <h2 className="ui header">"EVET" DEMEMİZE</h2>
              <Countdown date={moment("2019-09-21").toDate()}/>
            <h2 className="ui header" style={{marginTop: "0"}} >KALDI :)</h2>
            <img src={heart} />
          </div>
        </div>
          <Chip
            avatar={<Avatar>3</Avatar>}
            label="Bu ay yapılacaklar"
            clickable
            component={Link}
            to="/tasks"
            id="Dashboard-Tasks"
          />
          <Chip
            avatar={<Avatar><ErrorOutlineIcon /></Avatar>}
            label={[<div>Söz töreni tarihi</div>,<div>Kesinleşmedi</div>]}
            id="Dashboard-MeetingCeremonyDate"
          />
          <Chip
            avatar={<Avatar><ErrorOutlineIcon /></Avatar>}
            label={[<div>Nişan tarihi</div>,<div>Kesinleşmedi</div>]}
            id="Dashboard-EngagementCeremonyDate"
          />
          <Chip
            avatar={<Avatar><ErrorOutlineIcon /></Avatar>}
            label={[<div>Düğün tarihi</div>,<div>Kesinleşmedi</div>]}
            id="Dashboard-WeddingCeremonyDate"
          />

      </div>
    );
  }
}
export default Dashboard;
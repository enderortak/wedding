import { Avatar, Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ErrorOutline as ErrorOutlineIcon, Done as DoneIcon } from "@material-ui/icons";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import bg from "./bg.jpg";
import Countdown from "./components/Countdown";
import "./Dashboard.css";
import heart from "./heart.png";
import ApiService from "../../service/ApiService";

const api = new ApiService();

const styles = theme => ({
  textBox: {
    paddingLeft: theme.spacing.unit * 2,
  },
  guest: {
    border: "1px solid #DDDDDD",
    background: "#FFFFFF",
  },
  guestAvatar: {
    overflow: "visible"
  },
  guestConfirmBadge: {
    // top: "initial",
    // bottom: -15,
    // right: -15
  },
  guestConfirmIcon: {
    
      }
});

class Dashboard extends React.Component {
  componentDidMount(){
    this.getTasks();    
  }
  state = {
    loading: false,
  }
  getTasks() {
    this.setState({loading: true});
    api.fetch("task?sort={%22$natural%22:-1}","GET") //get last entry
    .then((result) => {
      this.setState({
        numberOfUncompletedTasks: this.getNumberOfUncompletedTasks(result[0].tasks),
        loading: false,
      })
    });
  }
  getNumberOfUncompletedTasks(tasks){
    const processedTasks = JSON.parse(tasks);
    return processedTasks[moment().startOf('month').format('YYYY-MM-DD')]
            .filter(task => !task.completed).length;
  }
  render() {
    const {loading, numberOfUncompletedTasks} = this.state;
    return (
      <div className="ui container" style={{textAlign: "center", position: "relative"}}>
        <div className="Dashboard" style={{backgroundImage: "url(" + bg + ")"}}>
          <div className="DashboardContent">

            <h2 className="ui header">"EVET" DEMEMİZE</h2>
              <Countdown date={moment("2019-09-14").toDate()}/>
            <h2 className="ui header" style={{marginTop: "0"}} >KALDI :)</h2>
            <img src={heart} />
          </div>
        </div>
          <Chip
            avatar={<Avatar>{loading ? "..." : numberOfUncompletedTasks}</Avatar>}
            label="Bu ay yapılacaklar"
            clickable
            component={Link}
            to="/tasks"
            id="Dashboard-Tasks"
          />
          <Chip
            avatar={<Avatar><DoneIcon /></Avatar>}
            label={[<div>Söz töreni tarihi</div>,<div>28.10.2018</div>]}
            id="Dashboard-MeetingCeremonyDate"
          />
          <Chip
            avatar={<Avatar><DoneIcon /></Avatar>}
            label={[<div>Nişan tarihi</div>,<div>28.10.2018</div>]}
            id="Dashboard-EngagementCeremonyDate"
          />
          <Chip
            avatar={<Avatar><DoneIcon /></Avatar>}
            label={[<div>Düğün tarihi</div>,<div>14.09.2019</div>]}
            id="Dashboard-WeddingCeremonyDate"
          />

      </div>
    );
  }
}
export default  withStyles(styles)(Dashboard);
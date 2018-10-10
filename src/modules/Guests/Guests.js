import _ from "lodash";
import React from "react";
import ApiService from "../../service/ApiService";
import AddGuest from "./components/AddGuest";
import GuestList from "./components/GuestList";
const api = new ApiService();
const numberOfTables = 6;
const tables = [...Array(numberOfTables).keys()].map(i => ({text: window.secureMode ? "Sublist" : "Masa " + (i + 1), value: i}));
class Guests extends React.Component {
  state = {
    guests: tables.map(i =>[]),
    loading: false,
  }
  constructor(props){
    super(props);
    this.getGuests = this.getGuests.bind(this);
    this.saveGuests = this.saveGuests.bind(this);
    this.addGuest = this.addGuest.bind(this);
    this.deleteGuest = this.deleteGuest.bind(this);
    this.updateGuest = this.updateGuest.bind(this);
    this.reorder = this.reorder.bind(this);
    this.move = this.move.bind(this);
  }
  
  componentDidMount(){
    this.getGuests();    
  }
  preProcess(guests){
    return JSON.parse(guests).map((table, tableIndex) =>
      table.map(guest => 
        ({...guest, id: _.uniqueId("table_" + tableIndex + ".")})
      )
    )
  }
  getGuests() {
    this.setState({loading: true});
    api.fetch("guest?sort={%22$natural%22:-1}","GET") //get last entry
    .then((result) => {
      this.setState({
        guests: this.preProcess(result[0].guests),
        loading: false,
      })
    });
  }
  saveGuests(){
    api.fetch("guest","POST", {guests: JSON.stringify(this.state.guests)})
    console.log(this.state.guests);
  }
  addGuest(tableIndex, guest){
    this.setState(
    state => {
      const guestsClone = _.clone(state.guests);
      guestsClone[tableIndex] =
      _.concat(guestsClone[tableIndex], guest)
      .map(i => 
       ({ ...i, id: _.uniqueId("table_" + tableIndex + ".")})
      );
      return ({ ...state, guests: guestsClone })
  },
  this.saveGuests);
  }
  deleteGuest(tableIndex, guest){
    this.setState(
      state => {
        const guestsClone = _.clone(state.guests);
        _.remove(guestsClone[tableIndex], i => i.id === guest.id); 
        return ({ ...state, guests: guestsClone });
      },
      this.saveGuests
    );
  }
  updateGuest(tableIndex, guest) {
    this.setState(
      state => {
        const guestsClone = _.clone(state.guests);
        const guestIndex = _.findIndex(guestsClone[tableIndex], i => i.id === guest.id);
        guestsClone[tableIndex][guestIndex] = guest;
        return ({ ...state, guests: guestsClone });
      },
      this.saveGuests
    );
  }
  reorder(tableIndex, oldIndex, newIndex) {
    
      this.setState(
        state =>{
          const guestsClone = _.clone(state.guests);
          const ind = tableIndex.split("_")[1];
          const [moved] = guestsClone[ind].splice(oldIndex, 1);
          guestsClone[ind].splice(newIndex, 0, moved);
          return { ...state, guests: guestsClone }
        },
        this.saveGuests
      );
  };
  move (sourceTableIndex, destinationTableIndex, droppableSource, droppableDestination) {
      this.setState(
        state => {
          const guestsClone = _.clone(state.guests);
          const sInd = sourceTableIndex.split("_")[1];
          const dInd = destinationTableIndex.split("_")[1];
          const [moved] = guestsClone[sInd].splice(droppableSource.index, 1);
          guestsClone[dInd].splice(droppableDestination.index, 0, moved);
          return { ...state, guests: guestsClone};
        },
        this.saveGuests
      );
  };
  render() {
    const {guests, loading} = this.state;
    return (
      <React.Fragment>
        <div className="ui container">
          <h2 className="ui dividing header" style={{position: "relative"}}>
          {!window.secureMode ? "Davetli listesi" : "List"}
          </h2>
          <AddGuest addGuest={this.addGuest} tables={tables}/>
          { loading && <div>Yükleniyor</div>}
          { !loading && guests && 
            <GuestList
              guests={guests}
              deleteGuest={this.deleteGuest}
              updateGuest={this.updateGuest}
              reorder={this.reorder}
              move={this.move}
            /> }
        </div>
      </React.Fragment>
    );
  }
}


export default Guests;

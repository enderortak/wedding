import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import ApiService from "../../service/ApiService";
import months from "./../../shared/months";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { getTasks, updateTasks } from "./Tasks.Actions";
const api = new ApiService();



const tasksSchema = {};
months.forEach(month => tasksSchema[month] = []);



class Tasks extends React.Component {
  state = {
    tasks: tasksSchema,
    loading: false,
  }
  constructor(props){
    super(props);
    this.getTasks = this.getTasks.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.reorder = this.reorder.bind(this);
    this.move = this.move.bind(this);
  }
  
  componentDidMount(){
    this.getTasks();    
  }
  preProcess(tasks){
    const processedTasks = JSON.parse(tasks);
    Object.keys(processedTasks).forEach(month => {
      processedTasks[month] = 
      processedTasks[month].map(
        task => 
        ({
          ...task, 
          id: _.uniqueId(month + "."),
          subtasks: task.subtasks.map(i => ({
            ...i,
            id: _.uniqueId(month + "." + i.id + ".")
          })
        )}
      ));
    });
    return processedTasks;
  }
  getTasks() {
    this.setState({loading: true});
    api.fetch("task?sort={%22$natural%22:-1}","GET") //get last entry
    .then((result) => {
      this.setState({
        tasks: this.preProcess(result[0].tasks),
        loading: false,
      })
    });
  }
  updateTasks(){
    api.fetch("task","POST", {tasks: JSON.stringify(this.state.tasks)})
    console.log(this.state.tasks);
  }
  addTask(month, task){
    this.setState(state => {
      const newList = [...state.tasks[month], task].map(i => ({...i, id: _.uniqueId(month + ".")}));
      return ({
      ...state,
      tasks: {
        ...state.tasks,
        [month]: newList,
      }
    })
  },
    ()=> {this.updateTasks();});
  }
  deleteTask(month, task){
    this.setState({
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [month]: this.state.tasks[month].filter(t => t.id !== task.id),
      }      
    }, ()=> {this.updateTasks();});
  }
  updateTask(month, task) {
    this.setState({
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [month]: this.state.tasks[month]
                  .map(t => t.id === task.id ? task : t),
      }
    }, ()=> {this.updateTasks();}); 
  }
  toggleCompleted(month, task){
    this.setState({
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [month]: this.state.tasks[month]
                  .map(t => ({...t, completed: t.id === task.id ? !t.completed : t.completed})),
      }
    }, ()=> {this.updateTasks();});
  }
  reorder(month, oldIndex, newIndex) {
      const monthArrayClone = Array.from(this.state.tasks[month]);
      const [removed] = monthArrayClone.splice(oldIndex, 1);
      monthArrayClone.splice(newIndex, 0, removed);
      this.setState({
        ...this.state,
        tasks: {
          ...this.state.tasks,
          [month]: monthArrayClone,
        }
      }, ()=> {this.updateTasks();});
  };
  move (source, destination, droppableSource, droppableDestination) {
      const sourceClone = Array.from(this.state.tasks[source]);
      const destClone = Array.from(this.state.tasks[destination]);
      const [removed] = sourceClone.splice(droppableSource.index, 1);

      destClone.splice(droppableDestination.index, 0, removed);

      this.setState({
        ...this.state,
        tasks: {
          ...this.state.tasks,
          [source]: sourceClone,
          [destination]: destClone,
        }
      }, ()=> {this.updateTasks();});
  };
  render() {
    const {tasks, loading} = this.state;
    return (
      <React.Fragment>
        <div className="ui container">
          <h2 className="ui dividing header" style={{position: "relative"}}>
            Yapılacaklar
          </h2>
          <AddTask addTask={this.addTask}/>
          { loading && <div>Yükleniyor</div>}
          { !loading && tasks && 
            <TaskList
              tasks={tasks}
              deleteTask={this.deleteTask}
              updateTask={this.updateTask}
              toggleCompleted={this.toggleCompleted}
              reorder={this.reorder}
              move={this.move}
            /> }
        </div>
      </React.Fragment>
    );
  }
}
const state2Props = state => ({
  tasks: state.taskList.tasks,
  loading: state.taskList.loading,
});

const dispatch2Props = dispatch => ({
  getTasks: () => dispatch(getTasks()),
  updateTasks: tasks => dispatch(updateTasks(tasks)),
});


export default connect(state2Props, dispatch2Props)(Tasks);

import ApiService from "../../service/ApiService";
export const FETCH_TASKS_BEGIN = "FETCH_TASKS_BEGIN";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";
export const UPDATE_TASKS_BEGIN = "FETCH_TASKS_BEGIN";
export const UPDATE_TASKS_SUCCESS = "UPDATE_TASKS_SUCCESS";
export const UPDATE_TASKS_FAILURE = "FETCH_TASKS_FAILURE";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_TASK = "TOOGLE_TASK";



export const getTasks = () => (dispatch) => {
  dispatch(fetchTasksBegin());
  const api = new ApiService();
  api.fetch("task?sort={%22$natural%22:-1}","GET") //get last entry
    .then((result) => {
      dispatch(fetchTasksSuccess(JSON.parse(result[0].tasks)));
      return result;
    })
    .catch(error => dispatch(fetchTasksFailure(error)));
};
const fetchTasksBegin = () => ({ type: FETCH_TASKS_BEGIN });
const fetchTasksSuccess = tasks => ({ type: FETCH_TASKS_SUCCESS, tasks });
const fetchTasksFailure = error => ({ type: FETCH_TASKS_FAILURE, error });

export const updateTasks = tasks => (dispatch) => {
  dispatch(updateTasksBegin());
  const api = new ApiService();
  api.fetch("task","POST", {tasks: JSON.stringify(tasks)})
    .then(() => {      
      dispatch(updateTasksSuccess());
      dispatch(getTasks());
    })
    .catch(error => dispatch(updateTasksFailure(error)));
};
const updateTasksBegin = () => ({ type: UPDATE_TASKS_BEGIN });
const updateTasksSuccess = tasks => ({ type: UPDATE_TASKS_SUCCESS });
const updateTasksFailure = error => ({ type: UPDATE_TASKS_FAILURE, error });

export const addTask = (task, month) => (dispatch) => {dispatch({type: ADD_TASK, task, month}); dispatch(updateTasks()); };
export const deleteTask = task =>  (dispatch) => {dispatch({type: DELETE_TASK, id: task.id}); dispatch(updateTasks()); };
export const toggleTask = task =>  (dispatch) => {dispatch({type: TOGGLE_TASK, id: task.id}); dispatch(updateTasks()); };
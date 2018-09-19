import _ from "lodash";
import months from "./../../shared/months";
import { ADD_TASK, DELETE_TASK, FETCH_TASKS_BEGIN, FETCH_TASKS_FAILURE, FETCH_TASKS_SUCCESS, TOGGLE_TASK, UPDATE_TASKS_BEGIN, UPDATE_TASKS_FAILURE, UPDATE_TASKS_SUCCESS } from "./Tasks.Actions";
const taskListInitState = {
  tasks: {},
  loading: false,
};
months.forEach(month => taskListInitState.tasks[month] = []);

const taskListReducer = (actualState = taskListInitState, action) => {
  switch (action.type) {
    case FETCH_TASKS_BEGIN:
      return ({
        ...actualState,
        loading: true,
      });
    case FETCH_TASKS_SUCCESS:
      return ({
        ...actualState,
        loading: false,
        tasks: action.tasks.map(i => ({...i, id: _.uniqueId()})),
      });
    case FETCH_TASKS_FAILURE:
      console.log(action.error);
      return ({
        ...actualState,
        loading: false,
        error: action.error.message,
      });
      case UPDATE_TASKS_BEGIN:
      return ({
        ...actualState,
        loading: true,
      });
    case UPDATE_TASKS_SUCCESS:
      return ({
        ...actualState,
        loading: false,
      });
    case UPDATE_TASKS_FAILURE:
      console.log(action.error);
      return ({
        ...actualState,
        loading: false,
        error: action.error.message,
      });
    case ADD_TASK:
      return ({
        ...actualState,
        tasks: [...actualState.tasks, action.task],
      });
    case DELETE_TASK:
      return ({
        ...actualState,
        tasks: actualState.tasks.filter(i => i.id !== action.id),
      });
      case TOGGLE_TASK:
      return ({
        ...actualState,
        tasks: actualState.tasks
                .map(i => ({
                  ...i,
                  completed: i.id === action.id ? !i.completed : i.completed
                })),
      });
    default: return actualState;
  }
};


export default taskListReducer;

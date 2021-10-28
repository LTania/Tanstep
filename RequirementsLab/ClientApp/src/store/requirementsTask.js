import { handleErrors, postData } from "../utils/httpUtils";

export const REQUIREMENTS_TASK_BEGIN = 'REQUIREMENTS_TASK_BEGIN';
export const REQUIREMENTS_TASK_SUCCESS = 'REQUIREMENTS_TASK_SUCCESS';
export const REQUIREMENTS_TASK_ERROR = 'REQUIREMENTS_TASK_ERROR';
export const FINISH_TASK_BEGIN = 'FINISH_TASK_BEGIN';
export const FINISH_TASK_SUCCESS = 'FINISH_TASK_SUCCESS';
export const FINISH_TASK_ERROR = 'FINISH_TASK_ERROR';
export const ADD_REQUIREMENT = 'ADD_REQUIREMENT';
export const DELETE_REQUIREMENT = 'DELETE_REQUIREMENT';
export const EDIT_REQUIREMENT = 'EDIT_REQUIREMENT';
export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';
export const CANCEL_EDITING = 'CANCEL_EDITING';
export const CLEAR_REQUIREMENTS = 'CLEAR_REQUIREMENTS';

export function requirementsTask(taskId) {
  return dispatch => {
    dispatch(requirementsTaskBegin());

    return fetch('/Requirements/GetTask/' + taskId)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(requirementsTaskSuccess(data));

        return data;
      })
      .catch(error => dispatch(requirementsTaskError(error)));
  };
}

export function finishTask(answers) {
  return dispatch => {
    dispatch(finishTaskBegin());

    const json = JSON.stringify(answers);

    return postData('/Requirements/Check/', json)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(finishTaskSuccess(data));

        return data;
      })
      .catch(error => dispatch(finishTaskError(error)));
  };
}

export const requirementsTaskBegin = () => ({
  type: REQUIREMENTS_TASK_BEGIN,
});

export const requirementsTaskSuccess = data => ({
  type: REQUIREMENTS_TASK_SUCCESS,
  payload: data,
});

export const requirementsTaskError = error => ({
  type: REQUIREMENTS_TASK_ERROR,
  payload: { error },
});

export const finishTaskBegin = () => ({
  type: FINISH_TASK_BEGIN,
});

export const finishTaskSuccess = data => ({
  type: FINISH_TASK_SUCCESS,
  payload: data,
});

export const finishTaskError = error => ({
  type: FINISH_TASK_ERROR,
  payload: { error },
});

export function addRequirement(requirement) {
  return dispatch => {
    dispatch({
      type: ADD_REQUIREMENT,
      payload: { requirement },
    });
  };
}

export function editRequirement(id) {
  return dispatch => {
    dispatch({
      type: EDIT_REQUIREMENT,
      payload: { id },
    });
  };
}

export function updateRequirement(requirement) {
  return dispatch => {
    dispatch({
      type: UPDATE_REQUIREMENT,
      payload: { requirement },
    });
  };
}

export function deleteRequirement(id) {
  return dispatch => {
    dispatch({
      type: DELETE_REQUIREMENT,
      payload: { id },
    });
  };
}

export function clearRequirements() {
  return dispatch => {
    dispatch({
      type: CLEAR_REQUIREMENTS,
    });
  };
}

export function cancelEditing() {
  return dispatch => {
    dispatch({
      type: CANCEL_EDITING,
    });
  };
}

export const requirementsTaskState = {
  taskId: null,
  taskText: '',
  loading: false,
  error: null,
  requirements: [],
  currentId: 0,
  isEditing: false,
  editingRequirement: null,
  result: null,
};

function copyArray(arr) {
  const newArr = [];

  arr.forEach(x => newArr.push(x));

  return newArr;
}

export const requirementsTaskReducer = (state = requirementsTaskState, action) => {
  switch (action.type) {
    case ADD_REQUIREMENT:
      {
        const requirements = copyArray(state.requirements);
        const requirement = action.payload.requirement;

        requirement.id = state.currentId++;
        requirements.push(requirement);
  
        return {
          ...state,
          requirements,
        };
      }

    case EDIT_REQUIREMENT:
      {
        const requirements = state.requirements;
        const id = action.payload.id;
        const requirement = requirements.find((r) => r.id === id);

        return {
          ...state,
          isEditing: true,
          editingRequirement: requirement,
        };
      }

    case UPDATE_REQUIREMENT:
      {
        const requirements = copyArray(state.requirements);
        const requirement = action.payload.requirement;
        const id = requirement.id;

        const oldRequirement = requirements.find((r) => r.id === id);

        oldRequirement.requirementText = requirement.requirementText;
        oldRequirement.keyword1 = requirement.keyword1;
        oldRequirement.keyword2 = requirement.keyword2;
        oldRequirement.priority = requirement.priority;
  
        return {
          ...state,
          requirements,
          isEditing: false,
        };
      }
      
    case DELETE_REQUIREMENT:
      {
        let requirements = copyArray(state.requirements);

        const id = action.payload.id;

        requirements = requirements.filter((requirement) => requirement.id !== id);

        let stillEditing = true;
        
        if (state.isEditing && state.editingRequirement.id === id) {
          stillEditing = false;
        }
        
        return {
          ...state,
          requirements,
          isEditing: stillEditing,
        };
      }

    case CLEAR_REQUIREMENTS:
      return {
        ...state,
        requirements: [],
        result: null,
        currentId: 0,
      };

    case CANCEL_EDITING:
      return {
        ...state,
        isEditing: false,
      };

    case REQUIREMENTS_TASK_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REQUIREMENTS_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        taskId: action.payload.id,
        taskText: action.payload.description,
      };

    case REQUIREMENTS_TASK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        taskId: null,
        taskText: '',
      };

    case FINISH_TASK_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FINISH_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload,
      };

    case FINISH_TASK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}

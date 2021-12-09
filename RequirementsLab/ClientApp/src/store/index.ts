import { taskListReducer } from './taskList';
import { startingTestReducer } from './startingTest';
import { requirementsTaskReducer } from './requirementsTask';
import { authorizationReducer } from './authorization';

export const reducers = {
  taskList: taskListReducer,
  startingTest: startingTestReducer,
  requirementsTask: requirementsTaskReducer,
  authorization: authorizationReducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void): void;
}

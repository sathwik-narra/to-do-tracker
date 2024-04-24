import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface TaskState {
  title: string,
  parent?: any
}

// Define the initial state using that type
const initialState: TaskState[] = [{
  title: 'Task 1',
  parent: 'Unassigned'
}]

export const taskSlice = createSlice({
  name: 'task',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState : initialState,
  reducers: {
    add: (state, action: PayloadAction<TaskState>) => {
      const task = action.payload;
      console.log('task store ', task);
      state.push(task);
      console.log('state store ', state);
      return state;
    },
    move: (state, action: PayloadAction<TaskState>) => {
      const task = action.payload;
      console.log('task store ', task);
      const index = state.findIndex(t => t.title === task.title);
      state[index].parent = task.parent;
      // console.log('state store ', state);
      return state;
    }
  },
})

export const { add, move } = taskSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const initTasks = (state: RootState) => {
  return state.add;
}

export default taskSlice.reducer
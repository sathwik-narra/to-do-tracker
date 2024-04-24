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
    todo: (state, action: PayloadAction<any>) => {
      const task = action.payload;
      console.log('task store ', task);
      switch (task.type) {
        case 'move':
          const index = state.findIndex(t => t.title === task.title);
          state[index].parent = task.parent;
          // console.log('state store ', state);
          return state;
        case 'add':
          state.push(task);
          console.log('state store ', state);
          return state;
        default:
          break;
      }
    },
  },
})

export const { todo } = taskSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const initTasks = (state: RootState) => {
  return state.todo;
}

export default taskSlice.reducer
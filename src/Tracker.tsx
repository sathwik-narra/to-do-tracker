import { closestCorners, DndContext } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import AddTask from "./AddTask";
import { Flex } from "@chakra-ui/react";
import { Tasks} from "./types";
import { useDispatch, useSelector } from "react-redux";
import { initTasks, todo } from "./taskSlice";

export default function Tracker() {
  // const [todoItems, setTodoItems] = useState<Array<Tasks>>([]);
  // const [doneItems, setDoneItems] = useState<Array<Tasks>>([]);
  // const [inProgressItems, setInProgressItems] = useState<Array<Tasks>>([]);
  // const [uItems, setuItems] = useState<Array<Tasks>>([]);

  const tasksFromStore = useSelector(initTasks);
  console.log('tasks from store ', tasksFromStore);

  const dispatch = useDispatch();

  const todoItems: Tasks[] = tasksFromStore.filter((task: any) => task.parent === "ToDo");
  const doneItems: Tasks[] = tasksFromStore.filter((task: any)=> task.parent === "Done");
  const inProgressItems: Tasks[] = tasksFromStore.filter(
    (task: any)=> task.parent === "In Progress"
  );
  const uItems: Tasks[] = tasksFromStore.filter((task: any)=> task.parent === "Unassigned");


  // useEffect(() => {
    // setTodoItems(tasksFromStore.filter((task) => task.parent === "ToDo"));
    // setDoneItems(tasksFromStore.filter((task) => task.parent === "Done"));
    // setInProgressItems(
    //   tasksFromStore.filter((task) => task.parent === "In Progress")
    // );
    // setuItems(tasksFromStore.filter((task) => task.parent === "Unassigned"));

  // }, [tasksFromStore]);

  const addNewTask = (title: string) => {
    dispatch(todo({type: "add", title, parent: "Unassigned" }));
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={(e) => {
        console.log('event, ', e);
        const title = e.active.data.current?.title ?? "";
        dispatch(todo({ type: "move", title, parent: e.collisions?.[0]?.id ?? "Unassigned" }));
      }}
    >
      <Flex flexDirection="column">
        <AddTask addTask={addNewTask} />
        <Flex flex="3">
          <TaskColumn title="ToDo" items={todoItems} />
          <TaskColumn title="In Progress" items={inProgressItems} />
          <TaskColumn title="Done" items={doneItems} />
          <TaskColumn title="Unassigned" items={uItems} />
        </Flex>
      </Flex>
    </DndContext>
  );
}

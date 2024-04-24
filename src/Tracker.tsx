import { closestCorners, DndContext, rectIntersection } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import AddTask from "./AddTask";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Tasks} from "./types";
import { useDispatch, useSelector } from "react-redux";
import { initTasks, add, move } from "./taskSlice";

export default function Tracker() {
  // const [todoItems, setTodoItems] = useState<Array<Tasks>>([]);
  // const [doneItems, setDoneItems] = useState<Array<Tasks>>([]);
  // const [inProgressItems, setInProgressItems] = useState<Array<Tasks>>([]);
  // const [uItems, setuItems] = useState<Array<Tasks>>([]);

  const taskBasedOnStatus = useSelector(initTasks);
  console.log('tasks from store ', taskBasedOnStatus);

  const dispatch = useDispatch();

  const todoItems: Tasks[] = taskBasedOnStatus.filter((task) => task.parent === "ToDo");
  const doneItems: Tasks[] = taskBasedOnStatus.filter((task) => task.parent === "Done");
  const inProgressItems: Tasks[] = taskBasedOnStatus.filter(
    (task) => task.parent === "In Progress"
  );
  const uItems: Tasks[] = taskBasedOnStatus.filter((task) => task.parent === "Unassigned");


  // useEffect(() => {
    // setTodoItems(taskBasedOnStatus.filter((task) => task.parent === "ToDo"));
    // setDoneItems(taskBasedOnStatus.filter((task) => task.parent === "Done"));
    // setInProgressItems(
    //   taskBasedOnStatus.filter((task) => task.parent === "In Progress")
    // );
    // setuItems(taskBasedOnStatus.filter((task) => task.parent === "Unassigned"));

  // }, [taskBasedOnStatus]);

  const addNewTask = (title: string) => {
    dispatch(add({ title, parent: "Unassigned" }));
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={(e) => {
        console.log('event, ', e);
        const title = e.active.data.current?.title ?? "";
        dispatch(move({ title, parent: e.collisions?.[0]?.id ?? "Unassigned" }));
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

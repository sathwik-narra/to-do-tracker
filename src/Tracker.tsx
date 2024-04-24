import { closestCorners, DndContext, rectIntersection } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import AddTask from "./AddTask";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Tasks} from "./types";
import { useDispatch, useSelector } from "react-redux";
import { initTasks, add, move } from "./taskSlice";

export default function Tracker() {
  const [todoItems, setTodoItems] = useState<Array<Tasks>>([]);
  const [doneItems, setDoneItems] = useState<Array<Tasks>>([]);
  const [inProgressItems, setInProgressItems] = useState<Array<Tasks>>([]);
  const [uItems, setuItems] = useState<Array<Tasks>>([]);

  const taskBasedOnStatus = useSelector(initTasks);
  console.log('tasks from store ', taskBasedOnStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    setTodoItems(taskBasedOnStatus.filter((task) => task.parent === "ToDo"));
    setDoneItems(taskBasedOnStatus.filter((task) => task.parent === "Done"));
    setInProgressItems(
      taskBasedOnStatus.filter((task) => task.parent === "In Progress")
    );
    setuItems(taskBasedOnStatus.filter((task) => task.parent === "Unassigned"));
  }, [taskBasedOnStatus]);

  const addNewTask = (title: string) => {
    setuItems([...uItems, { title }]);
    dispatch(add({ title, parent: "Unassigned" }));
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={(e) => {
        console.log('event, ', e);
        const container = e.over?.id;
        const title = e.active.data.current?.title ?? "";
        const index = e.active.data.current?.index ?? 0;
        const parent = e.active.data.current?.parent ?? "ToDo";
        if (container === "ToDo") {
          setTodoItems([...todoItems, { title }]);
        } else if (container === "Done") {
          setDoneItems([...doneItems, { title }]);
        } else if (container === "Unassigned") {
          setuItems([...uItems, { title }]);
        } else {
          setInProgressItems([...inProgressItems, { title }]);
        }
        if (parent === "ToDo") {
          setTodoItems([
            ...todoItems.slice(0, index),
            ...todoItems.slice(index + 1),
          ]);
        } else if (parent === "Done") {
          setDoneItems([
            ...doneItems.slice(0, index),
            ...doneItems.slice(index + 1),
          ]);
        } else if (parent === "Unassigned") {
          setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
        } else {
          setInProgressItems([
            ...inProgressItems.slice(0, index),
            ...inProgressItems.slice(index + 1),
          ]);
        }

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

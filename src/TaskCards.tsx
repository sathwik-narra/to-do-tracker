import { Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Tasks} from "./types";

export default function TaskCards({ tasks }: { tasks: Array<Tasks> }) {
  return (
    <Flex flexDirection="column" flex="1" padding="5">
      {tasks.map(({ title }, key) => {
        return <KanbanCard title={title} key={key} index={key} />;
      })}
    </Flex>
  );
}

interface TaskCardProps {
  title: string;
  index: number;
}

export const KanbanCard = ({ title, index }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      index,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Flex
      padding="2"
      backgroundColor="white"
      margin="2"
      borderRadius="3"
      border="2px solid gray.500"
      boxShadow="0px 0px 5px 2px #2121213b"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      transform={style.transform}
    >
      <Text>{title}</Text>
    </Flex>
  );
};

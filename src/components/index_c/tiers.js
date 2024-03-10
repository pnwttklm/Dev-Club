import { Card, Center, List, ListItem, ListIcon } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
export default function TierPage() {
  return (
    <>
      <div className="flex flex-row">
        <Card className="p-3 border-2 border-black rounded-none mt-16">
          <Center className="flex flex-col">
            <h1 className="font-bold text-2xl">LEARNER</h1>
            <p>Starter tier for everyone in the club.</p>
          </Center>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={BsCheckCircle} color="green.500" />
              Club room access
            </ListItem>
            <ListItem>
              <ListIcon as={BsCheckCircle} color="green.500" />
              Sprint meeting access
            </ListItem>
            <ListItem>
              <ListIcon as={BsCheckCircle} color="green.500" />
              Courses provided by the club
            </ListItem>
          </List>
        </Card>
        <Card>Hello2</Card>
      </div>
    </>
  );
}

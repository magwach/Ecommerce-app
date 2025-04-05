import { useProductStore } from "../../context/store.jsx";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { toaster } from "../ui/toaster";

const DialogBox = ({ name, id }) => {
  const { deleteProduct } = useProductStore();

  const HandleDeleteProduct = async (currId, name) => {
    const { success, message } = await deleteProduct(currId, name);
    console.log(success, message);
    
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        meta: {
          closable: true,
        },
      });
      return;
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        meta: {
          closable: true,
        },
      });
      return;
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton bg={"red.400"}>
          <FaTrashAlt size={20} fill="black" />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>Are you sure you want to delete <strong>{name}</strong></p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => HandleDeleteProduct(id, name)}
                >
                  Delete
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DialogBox;

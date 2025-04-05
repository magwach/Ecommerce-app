import { useProductStore } from "../../context/store.jsx";
("use client");

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
  Flex,
} from "@chakra-ui/react";
import { IoWarningSharp } from "react-icons/io5";
import { MdDone } from "react-icons/md";

export const toaster = createToaster({
  placement: "bottom-center",
  pauseOnPageIdle: true,
  duration: 3000,
});

export const Toaster = () => {
  const { error } = useProductStore();

  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }} bg={error ? "red" : "green"}>
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Flex align="center" mr={2}>
                {error ? <IoWarningSharp /> : <MdDone />}
              </Flex>
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && (
                <Toast.Title fontWeight="bold">{toast.title}</Toast.Title>
              )}
              {toast.description && (
                <Toast.Description fontWeight="medium">
                  {toast.description}
                </Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};

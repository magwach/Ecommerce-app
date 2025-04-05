import { useProductStore } from "../../context/store.jsx";
import { useColorModeValue } from "../../components/ui/color-mode.jsx";
import { Toaster, toaster } from "../../components/ui/toaster.jsx";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const { createProduct, editMode, updateProduct, setEditMode } =
    useProductStore();
  const location = useLocation();

  async function handleClick() {
    if (editMode) {
      const { success, message } = await updateProduct(location.state.currItem._id, newProduct);
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
        setNewProduct({
          name: "",
          price: "",
          image: "",
          description: "",
        });
        setEditMode(false);
        return;
      }
    } else {
      const { success, message } = await createProduct(newProduct);
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
        setNewProduct({
          name: "",
          price: "",
          image: "",
          description: "",
        });
        return;
      }
    }
  }

  useEffect(() => {
    if (location.state) {
      const { currItem } = location.state;
      setNewProduct({
        name: currItem.name,
        price: currItem.price,
        image: currItem.image,
        description: currItem.description,
      });
    }
  }, []);

  return (
    <Container maxW={"container.sm"}>
      <VStack gap={"8"}>
        <Toaster />
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={"8"}>
          {editMode ? "Edit Product" : "Create New Product"}
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={"6"}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack gap={"4"}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              autoComplete="off"
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              autoComplete="off"
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              autoComplete="off"
            />
            <Input
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              autoComplete="off"
            />
            <Button onClick={handleClick} w="full">
              {editMode ? "Save Changes" : "Add Product"}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

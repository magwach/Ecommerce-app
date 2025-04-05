import { FaEdit } from "react-icons/fa";
import ImageWithSkeleton from "../image-skeleton/skeleton.jsx";
import { Card, IconButton, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode.jsx";
import { useProductStore } from "../../context/store.jsx";
import { Toaster } from "../../components/ui/toaster.jsx";
import { useNavigate } from "react-router-dom";
import DialogBox from "../dialog/delete.dialog.jsx";

export default function DisplayCard({ product }) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const backgroundColor = useColorModeValue("white", "gray.800");
  const { setEditMode } = useProductStore();
  const navigate = useNavigate();

  const HandleEditProduct = (currItem) => {
    setEditMode(true);
    navigate("/create", { state: { currItem } });
  };

  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      cursor={"pointer"}
      bg={backgroundColor}
    >
      <Toaster />
      <ImageWithSkeleton src={product.image} />
      <Card.Body gap={2}>
        <Card.Title color={textColor}>{product.name}</Card.Title>
        <Card.Description color={textColor}>
          {product.description}
        </Card.Description>
        <Text
          textStyle="2xl"
          fontWeight="medium"
          letterSpacing="tight"
          mt="2"
          color={textColor}
        >
          $ {product.price}
        </Text>
      </Card.Body>
      <Card.Footer gap={4}>
        <IconButton bg={"blue.400"}>
          <FaEdit
            size={20}
            fill="black"
            onClick={() => HandleEditProduct(product)}
          />
        </IconButton>
        <DialogBox
          name={product.name}
          id={product._id}
        />
      </Card.Footer>
    </Card.Root>
  );
}

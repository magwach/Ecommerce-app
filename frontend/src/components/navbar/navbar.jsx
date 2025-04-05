import { Container, Flex, HStack, Text } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useColorMode } from "../ui/color-mode";
import { LuSun } from "react-icons/lu";
import { FaMoon } from "react-icons/fa6";
export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={"4"}  >
      <Flex
        h={"16"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack gap={{base: "14", sm: "7" }} alignItems={"center"}>
          <Link to={"/create"}>
            <BsPlusSquare size={"20"} />
          </Link>
          {colorMode === "light" ? (
            <FaMoon onClick={toggleColorMode} size={"20"} cursor={'pointer'} />
          ) : (
            <LuSun onClick={toggleColorMode} size={"20"} cursor={'pointer'} />
          )}
        </HStack>
      </Flex>
    </Container>
  );
}

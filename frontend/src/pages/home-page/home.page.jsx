import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../context/store.jsx";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DisplayCard from "../../components/card-display/card.jsx";
import { useColorModeValue } from "../../components/ui/color-mode.jsx";

export default function HomePage() {
  const { products, fetchProducts, loading, setLoading } = useProductStore();
  const spinnerColor = useColorModeValue("gray.600", "gray.200");

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, []);

  return (
    <Container py={"12"} maxW={"container.xl"}>
      <VStack gap={8}>
        <Text fontSize={30} fontWeight={"bold"} textAlign={"center"}>
          Current Products 🚀
        </Text>
        {loading ? (
          <AiOutlineLoading3Quarters
            className={`animate-spin size-25 text-${spinnerColor}`}
          />
        ) : products.length ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            gap={6}
            width={"full"}
          >
            {products.map((product) => {
              return <DisplayCard product={product} key={product.id} />;
            })}
          </SimpleGrid>
        ) : (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢
            <Link to={"/create"}>
              <Text color="blue.500" _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

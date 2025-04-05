import { Box } from "@chakra-ui/react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page/home.page.jsx";
import AddProduct from "./pages/add-product/add.product.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import { useColorModeValue } from "./components/ui/color-mode.jsx";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/create" element={<AddProduct />} />
      </Routes>
    </Box>
  );
}

export default App;

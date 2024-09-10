import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import { type Item } from "../api/itemAPI";
import { getToken } from "../api/authAPI";

const Protected: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const [refresh, setRefresh] = useState<number>(0);
  const [isLogin, setIsLogin] = useState(false);

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
  };

  const handleSave = () => {
    setSelectedItem(undefined);
    setRefresh(Math.random());
  };

  useEffect(() => {
    if (getToken()) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Container>
      {isLogin ? (
        <>
          <Typography variant="h2" align="center" gutterBottom>
            Item Management
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: "40px",
              padding: { xs: "16px", md: "24px" },
            }}
          >
            <ItemForm currentItem={selectedItem} onSave={handleSave} />
            <ItemList onEdit={handleEdit} refresh={refresh} />
          </Box>
        </>
      ) : (
        <Typography variant="h2" align="center" gutterBottom>
          Please login
        </Typography>
      )}
    </Container>
  );
};

export default Protected;

import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Item } from "../api/itemAPI";

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="body1">Quantity: {item.quantity}</Typography>
        <Typography variant="body1">Price: Rs. {item.price}</Typography>
        <IconButton onClick={() => onEdit(item)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => item._id && onDelete(item._id)}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ItemCard;

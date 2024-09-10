import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Item, createItem, updateItem } from "../api/itemAPI";

interface ItemFormProps {
  currentItem?: Item;
  onSave: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ currentItem, onSave }) => {
  const [item, setItem] = useState<Item>({
    name: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    if (currentItem) {
      setItem(currentItem);
    }
  }, [currentItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (item._id) {
      await updateItem(item._id, item);
    } else {
      await createItem(item);
    }
    setItem({
      name: "",
      quantity: 0,
      price: 0,
    });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={item.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="quantity"
        label="Quantity"
        type="number"
        value={item.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="price"
        label="Price"
        type="number"
        value={item.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {item._id ? "Update" : "Create"} Item
      </Button>
    </form>
  );
};

export default ItemForm;

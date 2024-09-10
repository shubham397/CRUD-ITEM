import React, { useEffect, useState } from "react";
import { getItems, deleteItem, Item } from "../api/itemAPI";
import ItemCard from "./ItemCard";

interface ItemListProps {
  refresh: number;
  onEdit: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ onEdit, refresh }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };
    fetchItems();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div style={{ overflow: "auto", height: "70vh" }}>
      {items.length > 0 ? (
        items.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <h1 style={{ textAlign: "center", color: "gray" }}>
          No items available
        </h1>
      )}
    </div>
  );
};

export default ItemList;

import { Request, Response } from "express";
import Item, { IItem } from "../models/item";

const sendErrorMsg = (res: Response, err: unknown) => {
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: "An unknown error occurred" });
  }
};

// Get all items
export const getAllItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items: IItem[] = await Item.find();
    res.json(items);
  } catch (err) {
    sendErrorMsg(res, err);
  }
};

// Get one item
export const getItemById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const item: IItem | null = await Item.findById(req.params.id);
    if (item == null) {
      res.status(404).json({ message: "Item not found" });
    } else {
      res.json(item);
    }
  } catch (err) {
    sendErrorMsg(res, err);
  }
};

// Create an item
export const createItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, quantity, price } = req.body;
  console.log(typeof name, "name");

  const item: IItem = new Item({
    name,
    quantity,
    price,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    sendErrorMsg(res, err);
  }
};

// Update an item
export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      res.status(404).json({ message: "Item not found" });
    } else {
      item.name = req.body.name ?? item.name;
      item.quantity = req.body.quantity ?? item.quantity;
      item.price = req.body.price ?? item.price;

      const updatedItem = await item.save();
      res.json(updatedItem);
    }
  } catch (err) {
    sendErrorMsg(res, err);
  }
};

// Delete an item
export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      res.status(404).json({ message: "Item not found" });
    } else {
      await item.deleteOne();
      res.json({ message: "Deleted item" });
    }
  } catch (err) {
    sendErrorMsg(res, err);
  }
};

import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  quantity: number;
  price: number;
}

const itemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IItem>("Item", itemSchema);

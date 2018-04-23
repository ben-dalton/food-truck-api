import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: String,
  truck: {
    type: Schema.Types.ObjectId,
    ref: 'Truck',
    required: true,
  },
});

export const Review = mongoose.model('Review', ReviewSchema);

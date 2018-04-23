import mongoose, { Schema } from 'mongoose';

const TruckSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
  avgCost: Number,
  geometry: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

export const Truck = mongoose.model('Truck', TruckSchema);

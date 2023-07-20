import mongoose from "mongoose";
// تعريف هيكل البيانات للمنطقة
const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 10
  }
});

// تعريف هيكل البيانات للمدينة
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  regions: {
    type: [regionSchema],
  }
});

const City = mongoose.model('City', citySchema);

export default City;
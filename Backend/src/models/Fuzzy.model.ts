import mongoose from "mongoose";
// تعريف هيكل البيانات للمنطقة
const regionSchema = new mongoose.Schema({
  population_growth: {
    type: Number,
    default: 60
  },
  building_resistance: {
    type: Number,
    default: 5
  }
});

// تعريف هيكل البيانات للمدينة
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: [regionSchema],
  }
});

const Fuzzy = mongoose.model('Fuzzy', citySchema);

export default Fuzzy;
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: { 
        type: Number
      }
    }
  ]
});

// WorkoutSchema.methods.something = function() {       
//   this.something

//   return this.something;
// };



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
});

// WorkoutSchema.methods.something = function() {       
//   this.something

//   return this.something;
// };



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

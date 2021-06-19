const db = require("../models");

// module.exports = function(app) {
//   app.get("/api/images", function(req, res) {
//     db.Image.find({}).then(function(dbImages) {
//       res.json(dbImages);
//     });
//   });

//   app.put("/api/images/:id", function(req, res) {
//     db.Image.updateOne({ _id: req.params.id }, { rating: req.body.rating }).then(function(dbImage) {
//       res.json(dbImage);
//     });
//   });
// };

module.exports = function(app){
    app.get('/api/workouts', (req, res) => {
        db.Workout.find({})
        .then((workoutData) => {
            res.json(workoutData);
        })
    });

    app.put('/api/workouts/:id', (req, res) => {
        db.Workout.findOne({_id: req.params.id})
        .then((workoutData) => {
            workoutData.excercises.push({
                type: req.body.type,
                name: req.body.name,
                duraton: req.body.duration,
                weight: req.body.weight,
                reps: req.body.reps,
                sets: req.body.sets,
                distance: req.body.distance
            })
            db.Workout.updateOne({_id: req.params.id}, {exercises: workoutData.exercises})
            .then((updatedWorkout) => {
                res.json(updatedWorkout);
            })
        })
    });

    // app.post('/api/workouts', (req, res) => {
    // })

    // app.get('/api/workouts/range', (req, res) => {
    // })
}

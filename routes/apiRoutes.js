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
            console.log(workoutData);
            res.send(workoutData);
        })
        .catch((err) => {
        res.json(err);
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
        .catch((err) => {
            res.json(err);
        })
    });

    app.post('/api/workouts', (req, res) => {
        const newWorkout = new db.Workout(req.body);

        db.Workout.create(newWorkout)
        .then((createdWorkout) => {
            res.json(createdWorkout);
        })
        .catch((err) => {
            res.json(err);
        })
    })

    app.get('/api/workouts/range', (req, res) => {
        db.Workout.find({}).aggregate([
                {
                    $addFields: {
                        totalDuration: { $sum : "$duration"}
                    }
                }
        ])
        .then((workoutData) => {
            res.send(workoutData);
        })
        .catch((err) => {
            res.json(err);
        })
    })
}

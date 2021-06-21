const db = require("../models");

module.exports = function(app){
    app.get('/api/workouts', async (req, res) => {
        try{
            const workoutData = await db.Workout.find({})
            let lastWorkout = workoutData[workoutData.length-1];
            let totalDuration = 0;
            lastWorkout.forEach((exercise) => {
                totalDuration += exercise.duration;
            })
            lastWorkout.totalDuration = totalDuration;
            res.send(workoutData);
        } catch(err) {
            res.json(err);
        }
    });

    app.put('/api/workouts/:id', async (req, res) => {
        try {
            const _id = req.params.id
            const workOutData = req.body
            const updated = await db.Workout.updateOne(
                {_id},
                {
                    $push: {
                        exercises: workOutData
                    }
                }
            )
            return res.json(updated)
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({error:"server_error"})
        }
        // db.Workout.findOne({_id: req.params.id})
        // .then((workoutData) => {
        //     console.log(workoutData)
        //     workoutData.excercises.push({
        //         type: req.body.type,
        //         name: req.body.name,
        //         duraton: req.body.duration,
        //         weight: req.body.weight,
        //         reps: req.body.reps,
        //         sets: req.body.sets,
        //         distance: req.body.distance
        //     })
        //     db.Workout.updateOne({_id: req.params.id}, {exercises: workoutData.exercises})
        //     .then((updatedWorkout) => {
        //         res.json(updatedWorkout);
        //     })
        // })
        // .catch((err) => {
        //     res.json(err);
        // })
    });

    app.post('/api/workouts', (req, res) => {
        const newWorkout = new db.Workout(req.body);

        db.Workout.create(newWorkout)
        .then((createdWorkout) => {
            console.log(createdWorkout);
            res.json(createdWorkout);
        })
        .catch((err) => {
            res.json(err);
        })
    })

    app.get('/api/workouts/range', (req, res) => {
    })
}

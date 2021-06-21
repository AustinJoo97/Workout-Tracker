const db = require("../models");

module.exports = function(app){
    app.get('/api/workouts', (req, res) => {
        db.Workout.find({})
        .then((workoutData) => {
            let lastWorkout = workoutData[workoutData.length-1];
            // let totalDuration = 0;
            // lastWorkout.exercises.forEach((exercise) => {
            //     totalDuration += exercise.duration
            // })
            // lastWorkout[totalDuration] = totalDuration;
            res.send(lastWorkout);
        })
        .catch((err) => {
            console.log(err)
        })
    });

    app.put('/api/workouts/:id', async (req, res) => {
        // Worked with Sam on this route
        try {
            const updatedWorkout = await db.Workout.updateOne({_id: req.params.id},
                {
                    $push: {
                        exercises: req.body
                    }
                }
            )
            return res.json(updatedWorkout)
        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({error:"server_error"})
        }
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

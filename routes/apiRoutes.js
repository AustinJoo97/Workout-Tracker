const db = require("../models");

module.exports = function(app){
    app.get('/api/workouts', async (req, res) => {
        try {
            const workoutData = await db.Workout.aggregate([{
                $addFields: {
                    totalDuration: { $sum : "$exercises.duration"}
                } 
            }])

            const lastWorkout = workoutData[workoutData.length-1];
            res.send(lastWorkout);
        } catch(err){
            res.json(err)
        }
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

    app.post('/api/workouts', async (req, res) => {
        try{
            const newWorkout = new db.Workout(req.body);
    
            const createdWorkout = await db.Workout.create(newWorkout)
            res.json(createdWorkout);
        } catch(err) {
            res.json(err);
        }
    })

    app.get('/api/workouts/range', async (req, res) => {
        const allWorkoutsData = await db.Workout.aggregate([{
            $addFields: {
                totalDuration: { $sum : "$exercises.duration"}
            } 
        }])
        const lastSeven = allWorkoutsData.slice(-7);

        res.json(lastSeven);
    })
}

const API = {
  async getLastWorkout() {
    // try {
    //   const response = await fetch("/api/workouts")
    //   const workouts = await response.json()
    //   const lastWorkout = workouts[workouts.length-1]
    //   let totalDuration = 0;
    //   lastWorkout.exercises.forEach(exercise => {
    //     totalDuration+=exercise.duration
    //   })
    //   lastWorkout.totalDuration = totalDuration
    //   return lastWorkout

    // } catch (error) {
    //   console.log(error.message)
    // }
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }

    const json = await res.json();
    let totalDuration = 0;
    json[json.length-1].exercises.forEach(exercise => {
        totalDuration+=exercise.duration
    })
    json[json.length-1].totalDuration = totalDuration
    return json[json.length - 1];
    // return json;
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};

import { Guitar } from "../Guitars.js";

// return all records
Guitar.find({}).lean()
  .then((guitars) => {
    console.log(guitars);
  })
  .catch(err => next(err));

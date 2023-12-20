const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const date =  new Date;
    const errors = [];
    if (title == null) {
      errors.push({ field: "title", message: "This field is required" });
    } else if (title.length > 55) {
        errors.push({field: "title", message: "Title to long."})
    }
    if (director == null) {
      errors.push({ field: "director", message: "This field is required" });
     } else if(director.length > 60) {
        errors.push({field: "director", message: "Director name to long."})
      }
    
    if (year == null) {
      errors.push({ field: "year", message: "This field is required" });
    } else if (year > 1890 && year <= date.getFullYear()) {
        errors.push({ field: "year", message: "This year is not valide" });
    }
    if (color == null) {
      errors.push({ field: "color", message: "This field is required" });
    } 
    if (duration == null) {
      errors.push({ field: "duration", message: "This field is required" });
    } else if (duration <= 0) {
        errors.push({ field: "duration", message: "Duration is not valide." });
    }
   
    if (errors.length) {
      res.status(422).json({ validationErrors: errors });
    } else {
      next();
    }
  };
  module.exports = validateMovie;
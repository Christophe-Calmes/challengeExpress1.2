const validateUsers = (req, res, next) => {
    const {firstname, lastname, email, city, language} = req.body;
    const errors = [];
    const nullable = (data, nameField) => {
        if(data == null) {
            errors.push({ field: nameField, message: "This field is required" });
        }
    }
    const sizeField = (data, targetSize, nameField) => {
        if (data.length > targetSize) {
            errors.push({ field: nameField, message: "This field is to long" });
        }
    }
    const isMail = (email) => {
        const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
        if (!emailRegex.test(email)) {
          errors.push({ field: 'email', message: 'Invalid email' });
        }
    }
    nullable(firstname, "firstname");
    sizeField(firstname, 30, "firstname");
    nullable(lastname, "lastname");
    sizeField(lastname, 30, "firstname")
    nullable(email, "email");
    isMail(email);
    sizeField(city, 60);
    sizeField(language, 60);

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
      } else {
        next();
      }
 
};

module.exports = validateUsers;
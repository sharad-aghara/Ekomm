const { validationResult } = require('express-validator');

const Validate = (req, res, next) => {

    //
    console.log('Request body:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors: ", errors );
        let error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({ error });
    }
    next();
};

module.exports = Validate;
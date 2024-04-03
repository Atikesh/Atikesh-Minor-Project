const validate = (schema) => async (req, res, next) => {
    try {
    
       const parseBody = await schema.parseAsync(req.body);
       req.body = parseBody;
       next();
    } catch (err) {
        
        const status = 422;
        const message = "Fill the input properly"
        const extraDetails = (err && err.errors && err.errors[0]) ? err.errors[0].message : "Unknown error";
        const error = {
            status,
            message,
            extraDetails,
        }
        console.log(error);
        //res.status(400).json({msg : error });
        next(error);
    }

};

module.exports = validate;
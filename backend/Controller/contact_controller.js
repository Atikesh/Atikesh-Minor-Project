const Contact = require("../Models/contact_model");

const contactForm = async(req, res) => {
    try{
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({ message: "message send successfully" }); 
        
    }catch (err){
        console.log('Error in sending message', err);
        return res.status(500).json({error: 'Server error'});
    }
};

module.exports = contactForm;
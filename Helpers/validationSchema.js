const joi = require('joi');

const authSchema = joi.object({
    email: joi.string().email().required().lowercase(),
    hashedPassword: joi.string().required().min(6).max(12),
    salt: joi.string()
    
});
module.exports = {authSchema};
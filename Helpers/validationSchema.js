const joi = require('joi');

const authSchema = joi.object({
    email: joi.string().email().required().lowercase(),
    password: joi.string().required().min(6),
    oldPassword: joi.string().min(6).max(12),
});
module.exports = {authSchema};
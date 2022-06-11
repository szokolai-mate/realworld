import Joi from "joi"

export const CredentialsValidation = {
    payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        repeatPassword: Joi.ref('password')
    })
}

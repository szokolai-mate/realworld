import Joi from "joi"
import { Schema, model } from 'mongoose';
import { Credentials } from "./credentials";

export const CredentialsValidation = {
    payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        repeatPassword: Joi.ref('password')
    })
};

export const CredentialsSchema = new Schema<Credentials>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

export const CredentialsModel = model<Credentials>('Credentials', CredentialsSchema);

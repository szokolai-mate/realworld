import { Request, ResponseToolkit} from "@hapi/hapi"
import { MongooseError } from "mongoose"
import { Credentials } from "../models/credentials"
import { CredentialsModel, CredentialsValidation } from "../models/credentials-model"

export const RegisterRoute = {
    method: 'POST',
    path: '/register',
    options: {
        validate: CredentialsValidation
    },
    handler: async (request: Request, h: ResponseToolkit) => {
        try {
            await new CredentialsModel(request.payload as Credentials).save()
        }
        catch(err: any) {
            if (err.code === 11000) {
                // Duplicate key
                return h.response({
                    error: "Email address already in use!"
                }).code(400);
            }
            else throw err;
        }

        return h.response().code(201);
    }
}

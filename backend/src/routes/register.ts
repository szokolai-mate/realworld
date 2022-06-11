import { Request, ResponseToolkit} from "@hapi/hapi"
import { Credentials } from "../models/credentials"
import { CredentialsValidation } from "../models/credentials-validation"

export const RegisterRoute = {
    method: 'POST',
    path: '/register',
    options: {
        validate: CredentialsValidation
    },
    handler: (request: Request, h: ResponseToolkit) => {
        console.log(request.headers)
        let cred = request.payload as Credentials
        console.log(cred.email)
        console.log(cred.password)
        return h.response("Not implemented").code(501);
    }
}

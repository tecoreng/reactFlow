/* 
HOW TO USE THIS TO SEND RESPONSE

In your controller you can use

res.handler.*function*(data object*, message* , error*)
Ex : 
res.handler.success()
res.handler.success({userName : "John"})
res.handler.success({userName : "John"}, "User created")
res.handler.success(undefined, "User created")
res.handler.serverError(undefined, undefined, error object)

for message you can pass simple string
1. We have sent an email to your account
or for with values like
We have sent an email to %s,
{
    key : "TRANSLATION KEY",
    value : "value of %s"
}
*/

class ResponseHandler {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    sender(code, message, data, error) {
        this.res
            .status(code)
            .json({
                message : message,
                // message : (typeof message === 'string' ? this.res.__(message) : this.res.__(message.key, message.value)),
                data
            })
        if(error) {
			// HANDLE LOGS AND OTHER STUFF
            // console.log("ResponseHandler -> sender -> error", error)
        }
    }

    /* 
        ARGUMENTS : Status code, message, data object,  error object
    */
    custom(...args) { this.sender(...args) }

    /* 
        ARGUMENTS : data object, message, error object
    */

    // 2XX SUCCESS
    success(data, message, info) { 
        this.sender(
            STATUS_CODES.SUCCESS,
            message || 'Request has been completed successfully.',
            data, info
        ) 
    }

    created(data, message, info) { 
        this.sender(
            STATUS_CODES.CREATED,
            message || 'Request has been created successfully.',
            data, info
        )
    }

    // 4XX CLIENT ERROR
    badRequest(data, message, info) {
        this.sender(
            STATUS_CODES.BAD_REQUEST,
            message || 'Request line contained invalid characters.',
            data, info
        )
    }

    unauthorized(data, message, info) { 
        this.sender(
            STATUS_CODES.UNAUTHORIZED,
            message || 'You are not authorized to access.',
            data, info
        )
    }

    forbidden(data, message, info) { 
        this.sender(
            STATUS_CODES.FORBIDDEN,
            message || 'You are not authorized to access.',
            data, info
        )
    }

    alreadyReport(data, message, info) { 
        this.sender(
            STATUS_CODES.NOT_VALID_DATA,
            message || 'Already Reported',
            data, info
        )
    }

    notValidEmail(data, message, info) { 
        this.sender( 
            STATUS_CODES.NOT_FOUND,
            message || 'Mailchimp is use only valid email, Please use valid email!!',
            data, info
        )
    }

    notFound(data, message, info) { 
        this.sender( 
            STATUS_CODES.NOT_FOUND,
            message || 'Resource associated with the request could not be found.',
            data, info
        )
    }

    conflict(data, message, info) { 
        this.sender( 
            STATUS_CODES.CONFLICT,
            message || 'Provided information already exist!',
            data, info
        )
    }

    preconditionFailed(data, message, info) { 
        this.sender( 
            STATUS_CODES.PRECONDITION_FAILED,
            message || 'Please complete other steps first',
            data, info
        )
    }

    validationError(data, message, info) { 
        this.sender( 
            STATUS_CODES.VALIDATION_ERROR,
            message || 'Validation error !',
            data, info
        )
    }
    
    
    // 5XX SERVER ERROR
    serverError(error, data, message){ 
        if(error.name === "ValidationError")
            return this.validationError(error)

        this.sender(
            STATUS_CODES.SERVER_ERROR,
            message || 'Request failed due to an internal error.',
            data, error
        )
    }
}

module.exports = ResponseHandler;
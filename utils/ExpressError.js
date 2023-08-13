class ExpressError extends Error {
    constructor(message, statusCode){
        super();
        this.messege = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
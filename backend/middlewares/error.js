const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
      err.message = err.message || 'internal server error'
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage:err.message,
            stack:err.stack
        });
   

     }

     if(process.env.NODE_ENV === 'PRODUCTION'){
         let error = {...err}

         error.message = err.message



         // Wrong Mongoose object id error
         if(err.name==='CastError'){
             const message =   `Resource not found . Invalid :${err.path}`;
             error = new ErrorHandler(message,400);
         }
       
            // mongoose duplicate key error
      
            if(err.code===11000){
                const message = `Duplicate ${Object.keys(err.keyValue)} entered`
                error = new ErrorHandler(message,400);
               
             }

             // handling wrong jwt error
             if(err.name==='jsonWebTokenError'){
                const message =   `JsonwebToken is  Invalid `;
                error = new ErrorHandler(message,400);
            }

            // handling expired jwt token
             if(err.name==='TokenExpiredError'){
                const message =   `JsonwebToken is expired`;
                error = new ErrorHandler(message,400);
            }

        // Handling mongoose validation error 
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value=>value.message);
            error= new  ErrorHandler(message,400)
        }
        
         res.status(err.statusCode).json({
            success:false,
            errMessage:error.message || 'Internal server error'
        })
     }
}
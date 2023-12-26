const errorHandler=(err,req,res,next)=>{
    const statusCode =res.statusCode ? res.statusCode:500;
    switch(statusCode){
        case 400:
            res.json({
                title:"Validation Failed",
                message: err.message
            })
        case 404:
            res.json({
                title:"Not Found",
                message:err.message
            })
    }
};

module.exports=errorHandler;
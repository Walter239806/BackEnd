import winston, {createLogger, format} from "winston";

const {combine, timestamp, label, metadata, printf }= format;

const options = {
info:{ 

    level: "info",
    filename: "logs/app.log",
    handleExceptions: true,
    maxSize: 100000,
    maxFiles: 5,


},
erros:{

    level:"error",
    filename:"logs/error.log",
    handleExceptions: true,
    maxSize: 100000,
    maxFiles: 5

}

};


const logFormat = printf(
    ({level, message, timestamp, label, metadata})=>{
        const mylog = `${timestamp}[${label}] ${level}: ${message} ${metadata && Object.keys(metadata).length 
        ? `\n metadata: ${JSON.stringify(metadata, null, 2)}` :""
    }`;
    return mylog;
    
    }

)
export const TEST= (req, res, next) => {
    try {
        //a=null 
        //throw new Error("error de entrada");
        const input = req.body;
        console.log('input=', input);

        res.send(`Nombre ingresado: ${input.name}`);
    } catch(error){

        return next({
            Code:501,
            message:{
                text : "Error 501",
                params:{
                    value:"01",
                        }
                    }
            })
        
            }
        }

        
import { Loan } from "../models/Loan";
import { Credit } from "../models/Credits"
// const all: any;
// const Update : any;
const CreditsService = {
    
        getAll: async () => {
            console.log("Pidiendo los datos")
            return await Credit.find({});
        },

        create: async (data : any) => {
            console.log("Publicando datos")
            const credit = new Credit(data);
            credit.save();
            return credit;
        },
        update: async (data : any)=>{
            console.log("Actualizando datos");
            const id = data.IdProducto;
            delete data.IdProducto;
            // Forma si solo se modifica el Estado del Credito(Al dia o moroso)
            // delete data.IdUsuario;
            // delete data.IdEntidad;
            // delete data.TotalCupoCredito;
            // delete data.TotalPagoCredito;
            // delete data.CantidadAbonar;
            return await Credit.where({IdProducto : id}).update(data);
        },
        delete:async (id : string)=>{
            console.log("Actualizando datos");
            return await Credit.deleteOne({IdProducto : id});
        }   
    
}


export default CreditsService;

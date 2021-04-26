import { Loan } from "../models/Loan";
import { Credit } from "../models/Credits"
// const all: any;
// const Update : any;
const LoansService = {
    all : {
        getAll: async () => {
            console.log("Pidiendo los datos")
            return await Loan.find({});
        }
        
    
    },
    Update : {
        getAll: async () => {
            console.log("Pidiendo los datos")
            return await Credit.find({});
        }
    
    }
}


export default LoansService;


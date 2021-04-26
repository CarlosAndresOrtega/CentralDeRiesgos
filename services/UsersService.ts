import { User } from "../models/User"

const UsersService = {

    getAll: async () => {
        console.log("Pidiendo los datos")
        return await User.find({});
    },
    get: async ( TypeDocument: String, NDocument: String) => {
        console.log("Pidiendo los datos");
        const arr = await User.find({ TypeDocument, NDocument });
        
        return await arr;
    },
    delete:async (id : string)=>{
        console.log("Actualizando datos");
        return await User.deleteOne({IdProducto : id});
    }  
}

export default UsersService;
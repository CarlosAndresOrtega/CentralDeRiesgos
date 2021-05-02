import { ObjectId } from 'bson';
import mongoose from 'mongoose';

const CreditsSchema = new mongoose.Schema({
    
        // _id : {
        //     type: ObjectId,
        //     required: true
        // },
        IdUsuario : {
            type: String,
            require: true
        },
        IdEntidad : {
            type: String,
            require:true
        },
        TotalCupoCredito : {
            type: Number,
            require:true
        },
        TotalPagoCredito : {
            type: Number,
            require:true
        },
        CantidadAbonar : {
            type: Number,
            require:true
        },
        Estado : {
            type: String,
            require:true
        }

});

const Credit = mongoose.model('credit', CreditsSchema);

export { Credit }

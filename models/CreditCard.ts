import { Int32 } from 'bson';
import mongoose from 'mongoose';

const CreditCardSchema = new mongoose.Schema({
    
    // _id : {
    //     type: String,
    //     require: true
    // },
    IdUsuario : {
        type: String,
        require: true
    },
    IdEntidad : {
        type: String,
        require:true
    },
    CantidadUso : {
        type: Number,
        require:false
    },
    TotalCupoTc : {
        type: Number,
        require:false
    },
    CantidadDisponible : {
        type: Number,
        require:false
    },
    Estado : {
        type: String,
        require:false
    }

});
const CreditCard = mongoose.model('Creditscard', CreditCardSchema);

export { CreditCard }

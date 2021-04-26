export interface CreditCardI {
    IdProducto : String,
    IdUsuario :String,
    IdEntidad :String,
    CantidadUso ?:  Number,
    TotalCupoTc?:  Number,
    CantidadDisponible?: Number, 
    Estado?: String
}
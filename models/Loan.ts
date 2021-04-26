import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
    
        
    totalValue: {
        type: Number,
        required: true
    },
    payments: {
        type: [{
            date: String,
            amount: Number
        }],
        required: false
    }
});

const Loan = mongoose.model('Loan', loanSchema);

export { Loan }
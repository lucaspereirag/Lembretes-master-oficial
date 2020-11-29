
const mongoose = require ('mongoose');

const lembreteSchema = mongoose.Schema ({
titulo: {type: String, required: true},
descricao: {type: String, required: false},
datareal: {type: String, required: true},
datacad: {type: String, required: true}
});

module.exports = mongoose.model('Lembrete', lembreteSchema);
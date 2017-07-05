var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var internSchema = new Schema({
        first_name: {type: String, default: ''},
        middle_name: {type: String, default: ''},
        last_name: {type: String, default: ''},
        id_number: {type: String, default: '', maxlength: 13},
        address: {type: String, default: ''},
        associated_degree: [{type: String, default: ''}],
        associated_universities: [{type: String, default: ''}],
        email: {type: String, default: ''},
        git_profile: {type: String, default: ''},
        website: {type: String, default: ''},
        phone_number1: {type: String, default: ''},
        phone_number2: {type: String, default: ''},
        programme: {type: String, default: ''},
        year_started: {type: Date, default: ''},
        year_ended: {type: Date, default: ''},
        status: {type: String, default: ''},
        profile_picture: {type: String, default: ''},
        bio: {type: String, default: ''}
});

internSchema.index({first_name: 'text', middle_name: 'text', last_name: 'text', id_number: 'text'});

module.exports = mongoose.model('Intern', internSchema);
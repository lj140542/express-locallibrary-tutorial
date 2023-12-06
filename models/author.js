const { DateTime } = require('luxon');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
  let fullname = '';
  if (this.first_name && this.family_name)
    fullname = `${this.first_name}, ${this.family_name}`;
  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`
});

AuthorSchema.virtual('lifespan').get(function () {
  if (this.date_of_birth) {
    let lifespan = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    if (this.date_of_death)
      lifespan += ' - ' + DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    return lifespan
  }
  else
    return '';
});

module.exports = mongoose.model('Author', AuthorSchema);
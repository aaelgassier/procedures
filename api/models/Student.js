/**
 * Student.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'mySqlProcedures',
  schema: true,

  attributes: {
    studentNationalID: {
      type:'string',
      required: true,
      unique: true
    },
    studentName: {
      type: 'string',
      required: true
    },
    studyCountry: {
      type: 'string',
      required: true
    },
    studyCountryGroup: {
      type: 'string',
      required: true
    },
    createdAt: {
      type: 'datetime'
    },
    updatedAt: {
      type: 'datetime'
    },
  }
};

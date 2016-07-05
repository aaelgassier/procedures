/**
 * Procedure.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'mySqlProcedures',
  schema: true,

  attributes: {
    proStudentNationalID: {
      type:'integer',
      required: true,
    },
    procedureType: {
      type: 'string',
      required: true
    },
    proStudyCountryGroup: {
      type: 'string'
    },
    procedureNote: {
      type: 'string'
    },
    procedureLevel: {
      type: 'integer',
      defaultsTo: 1
    },
    procedurePending: {
      type: 'boolean',
      defaultsTo: false
    },
    proRefNo: {
      type: 'integer',
      defaultsTo: 0
    },
    proFilePath: {
      type: 'string'
    },
    createdAt: {
      type: 'datetime'
    },
    updatedAt: {
      type: 'datetime'
    },
  }
};

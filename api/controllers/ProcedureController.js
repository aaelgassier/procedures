/**
 * ProcedureController
 *
 * @description :: Server-side logic for managing procedures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/* Display actions according to user's permissions */
	main: function (req, res) {
		res.view();
	},

	/* This action is rendering only search page for a student to add a new procedure */
	'search-to-create-new-procedure': function (req, res, next) {
		res.view();

	},

	/* This action is to search about a student */
	/* if the student has been found, will be redirected to create create page (added action) to list details of */
	/* searched student otherwise will be redirected to search page again*/
	'procedure-submit': function (req, res, next) {
		Student.findOne({studentNationalID: req.param('studentSearchByNID'), studyCountryGroup: req.session.user.department }, function foundStudent(err, student) {
			if (err) return next(err);

			if (!student) {
				var noStudentSearchError = [{name: 'noStudent', message: 'Student not found'}]
				console.log(noStudentSearchError);
				req.session.flash = {
					err: noStudentSearchError
				}
				res.redirect('/procedure/search-to-create-new-procedure');
				return;
			}
			res.view({
				student: student
			});
		});
	},

	/* This action is to add the procedure to database */
	create: function (req, res, next) {
		var procedureObj = {
			proStudentNationalID: req.param('proStudentNationalID'),
			procedureType: req.param('procedureType'),
			proStudyCountryGroup: req.session.user.department,
			proUserID: req.session.user.id
		};
		Procedure.create(procedureObj, function procedureCreated (err, procedure) {
			/* if there is an error */
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
				/* if error redirect back to sign-up page*/
				return res.redirect('/procedure/procedure-submit');
			}
			/* After successfully creating the user redirect to the new show action */
			res.redirect('/procedure/show/' + procedure.id);
		});
	},

	/* render the profie view --> /views/show.ejs*/
	show: function (req, res, next) {
		Procedure.findOne(req.param('id'), function foundProcedure (err, procedure) {
			if (err) return next(err);
			if (!procedure) return next();
			res.view({
				procedure: procedure
			});
		});
	},
	/* This action displays new procedures according to user's department */
	'list-new-procedures-by-group': function (req, res, next) {
		/* The new procedure for each user equal to (procedure level = position). Meaning, if the procedure level = 1 this procedure is a new for departent */
		Procedure.find({procedureLevel: req.session.user.position, proStudyCountryGroup: req.session.user.department}, function foundProcedures (err, procedures) {
			if (err) return next(err);
			/* pass the array down */
			res.view({
				procedures: procedures
			});
		});
	},

	/* This action displays all new procedures  */
	'list-all-new-procedures': function (req, res, next) {
		if (req.session.authenticated) {
			/* The new procedure for each user equal to (procedure level = position). Meaning, if the procedure level = 1 this procedure is a new for departent */
			Procedure.find({procedureLevel: req.session.user.position, procedurePending: 1}, function foundProcedures (err, procedures) {
				if (err) return next(err);
				/* pass the array down */
				res.view({
					procedures: procedures
				});
			});
		} else {
				return res.redirect('/')
		}
	},

	/* render the edit view  */
	decision: function (req, res, next) {
		/* find the user from the id passed in via params*/
		Procedure.findOne(req.param('id'), function foundProcedure (err, procedure){
			if (err) return next(err);
			/* in case the procedure does not exit display this message */
			if (!procedure) return next('Procedure does not exist.');
			/* pass the array down */
			res.view({
				procedure: procedure
			});
		});
	},

	decisionUpdate: function (req, res, next) {
		if (req.param('procedureLevel') != req.session.user.position)
		{
			var procedureObj = {
					procedureLevel: req.param('procedureLevel'),
					procedurePending: 0
				}
			} else {
				procedureObj = {
				procedureLevel: 0,
				procedurePending: 0,
				procedureNote: req.param('procedureNote')
				}
			}
		Procedure.update(req.param('id'), procedureObj, function procedureUpdated(err) {
			/* in case getting error during uploading the file, redirecting to the same again*/
			if (err) {
				return res.redirect('/procedure/decision/' + req.param('id'));
			}
			else {
				return res.redirect('/procedure/list-new-procedures-by-group');
			}
		});
	},
	pending: function (req, res, next) {

		/* The new procedure for each user equal to (procedure level = position). Meaning, if the procedure level = 1 this procedure is a new for departent */
		Procedure.find({procedureLevel: req.session.user.position, procedurePending: 0}, function foundPendingProcedures (err, pendingProcedures) {
			if (err) return next(err);

			if (!pendingProcedures) return next('Procedure does not exist.');

			/* pass the array down */
			res.view({
				pendingProcedures: pendingProcedures
			});
		});
	},

	pendingUpdate: function (req, res, next) {
		Procedure.update(req.param('id'), {procedurePending: 1}, function procedureUpdated(err) {
			/* in case getting error during uploading the file, redirecting to the same again*/
			if (err) {
				return res.redirect('/procedure/edit/' + req.param('id'));
			}
			/* in case the operation has been successfully done, redirecting to show procedure page */
			// res.redirect('/procedure/show/' + req.param('id'));
			return res.redirect('/procedure/pending');
		});
	},

	/* Process the info from edit view */
	// update: function (req, res, next) {
	// 	Procedure.update(req.param('id'), req.params.all(), function procedureUpdated(err) {
	// 		/* in case getting error during uploading the file, redirecting to the same again*/
	// 		if (err) {
	// 			return res.redirect('/procedure/edit/' + req.param('id'));
	// 		}
	// 		/* in case the operation has been successfully done, redirecting to show procedure page */
	// 		// res.redirect('/procedure/show/' + req.param('id'));
	// 		console.log("ok");
	// 	});
	// },

	/* This action is to list all procedures has been changed by Entry Data and passed to who scans documents */
	/* in order to upload scanned documents by pressing Edit button to move to scanner action */
	/* -------------------------NEXT STEP ------------------------- */
	// outgoing: function (req, res, next) {
	// 	/* find all procedures have level 10 becuase scanner person has position 10 */
	// 	Procedure.find({procedureLevel: req.session.user.position}, function foundProcedures (err, procedures) {
	// 		if (err) return next(err);
	// 		/* pass the array down */
	// 		res.view({
	// 			procedures: procedures
	// 		});
	// 	});
	// },
	/* render the details of procedure which is going to be attached by a document */
	/* after uploading the file the update action will be taken */
	scanner: function (req, res, next) {
		/* find the procedure from the id passed in via params */
		Procedure.findOne(req.param('id'), function foundProcedure (err, procedure){
			if (err) return next(err);
			/* in case the procedure does not exit display this message */
			if (!procedure) return next('Procedure does not exist.');
			/* pass the array down */
			res.view({
				procedure: procedure
			});
		});
	},
	upload: function  (req, res) {
	  req.file('proFilePath').upload({dirname: '../../assets/uploads/'},function (err, files) {
	    if (err)
	      return res.serverError(err);
			if (files.length === 0){
		      return res.badRequest('No file was uploaded');
		    }
    return res.redirect('/procedure/list-all-new-procedures');
    });
  }
};

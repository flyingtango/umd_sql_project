var express = require('express');
var router = express.Router();

// home page
router.get('/', function(req, res, next) {

    var db = req.con;
    var data = "";

    var lang = "";
    var lang = req.query.lang;

    var filter = "";
    if (lang) {
        filter = 'WHERE id = ?';
    }

    db.query('SELECT * FROM Language ' + filter, lang, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use index.ejs
        res.render('index', { title: 'Language Information', data: data, lang: lang });
    });

});

// add page
router.get('/add', function(req, res, next) {

    // use langAdd.ejs
    res.render('langAdd', { title: 'Add language', msg: '' });
});

// add post
router.post('/langAdd', function(req, res, next) {

    var db = req.con;

    // check langid exist
    var langid = req.body.langid;
    var qur = db.query('SELECT id FROM Language WHERE id = ?', langid, function(err, rows) {
        if (err) {
            console.log(err);
        }

        var count = rows.length;
        if (count > 0) {

            var msg = 'Language already exists.';
            res.render('langAdd', { title: 'Add language', msg: msg });

        } else {

            var sql = {
                id: req.body.langid,
                iName: req.body.iName,
                anaType: req.body.anaType,
                orientType: req.body.orientType,
                sourceType: req.body.sourceType,
            };

            //console.log(sql);
            var qur = db.query('INSERT INTO Language SET ?', sql, function(err, rows) {
                if (err) {
                    console.log(err);
                }
                res.setHeader('Content-Type', 'application/json');
                res.redirect('/');
            });
        }
    });


});

// edit page
router.get('/langEdit', function(req, res, next) {

    var id = req.query.id;
    //console.log(id);

    var db = req.con;
    var data = "";

    db.query('SELECT * FROM Language WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }

        var data = rows;
        res.render('langEdit', { title: 'Edit Language', data: data });
    });

});


router.post('/langEdit', function(req, res, next) {

    var db = req.con;
    var id = req.body.id;

    var sql = {
        id: req.body.langid,
        iName: req.body.iName,
        anaType: req.body.anaType,
        orientType: req.body.orientType,
        sourceType: req.body.sourceType,
    };

    var qur = db.query('UPDATE Language SET ? WHERE id = ?', [sql, id], function(err, rows) {
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});


router.get('/langDelete', function(req, res, next) {

    var id = req.query.id;

    var db = req.con;

    var qur = db.query('DELETE FROM Language WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});



// Q1
router.get('/q1', function(req, res, next) {

    
    var db = req.con;
    var data = "";
    db.query('SELECT region, count (pID) as num from Program group by region', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use q1.ejs
        res.render('q1', { title: 'Answer of Q1', data: data });
    });
});


// Q2
router.get('/q2', function(req, res, next) {

    var db = req.con;
    var data = "";
    db.query('SELECT Field.fName, count(Position.fID) as num from Position, Field where Field.fID = Position.fID group by Field.fName order by num desc limit 0,5', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use q2.ejs
        res.render('q2', { title: 'Answer of Q2', data: data });
    });
});

// Q2
router.get('/q2', function(req, res, next) {

    var db = req.con;
    var data = "";
    db.query('SELECT Field.fName, count(Position.fID) as num from Position, Field where Field.fID = Position.fID group by Field.fName order by num desc limit 0,5', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use q2.ejs
        res.render('q2', { title: 'Answer of Q2', data: data });
    });
});

// Field
router.get('/field', function(req, res, next) {

    var db = req.con;
    var data = "";
    db.query('SELECT * FROM Field', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use q2.ejs
        res.render('field', { title: 'Field List', data: data });
    });
});

// Program
router.get('/program', function(req, res, next) {

    var db = req.con;
    var data = "";
    db.query('SELECT * FROM Program', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        // use q2.ejs
        res.render('program', { title: 'Program List', data: data });
    });
});

module.exports = router;

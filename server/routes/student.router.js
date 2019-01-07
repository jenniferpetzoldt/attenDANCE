const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET Routes
//Populates session dropdown with available sessions
router.get('/session', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT "id", "form_month", "form_year" FROM "wed_form" WHERE "start_date" > now();`;
        pool.query(query)
        .then((response) => {
            res.send(response.rows);
        }).catch((error) => {
            console.log('GET sessions failed', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

//GET for class names, month, and year for selected session sorted ascending by date
router.get('/session/:id', (req, res) => {
    console.log('specific session GET req.body', req.params);
    if(req.isAuthenticated()) {
        const query = `SELECT * FROM "wed_form" WHERE "id" = $1 ORDER BY "start_date" ASC;`;
        pool.query(query, [req.params.id])
        .then((response) => {
            res.send(response.rows);
        }).catch((error) => {
            console.log('GET specific session failed', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

//POST Routes
// adds student registrations to database
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        const regToAdd = req.body;
        const query = `INSERT INTO "registration" 
        ("person_id", "wed_form_id", "first_name", "last_name", "email", 
        "dancer_role", "admission", "first_hour", "second_hour", "payment_type", "owes") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
        pool.query(query, [regToAdd.newReg.personalInfo.userId,
            regToAdd.newReg.formId.formId,
            regToAdd.newReg.personalInfo.firstName,
            regToAdd.newReg.personalInfo.lastName,
            regToAdd.newReg.personalInfo.email,
            regToAdd.newReg.personalInfo.role,
            regToAdd.newReg.personalInfo.admission,
            regToAdd.newReg.lessons.firstHour,
            regToAdd.newReg.lessons.secondHour,
            regToAdd.newReg.payment.paymentMethod,
            regToAdd.newReg.total])
            .then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                console.log('POST registration failed', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

//DELETE Routes

//PUT Routes

module.exports = router;
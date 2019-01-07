const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET Routes
//Attendance select - populates session select
//TODO: change 'form' language to 'session' 
router.get('/sessionSelect', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT "id", "form_month", "form_year" FROM "wed_form" WHERE "start_date" < now() 
        ORDER BY "start_date" ASC;`;
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

//Attendance table - gets all registrations matching selection. Registrations sorted ascending by last name.
//TODO: change 'form' language to 'session' 
router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "registration" WHERE "wed_form)id" = $1 ORDER BY "last_name" ASC;`;
        pool.query(query, [req.params.id])
            .then((response) => {
                res.send(response.rows);
            }).catch((error) => {
                console.log('Registration GET error', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

//Session table - populates with created sessions - only gets sessions in the future
//TODO: change 'form' language to 'session' 
router.get('/createdSessions', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "wed_form" WHERE "start_date" > now() ORDER BY "start_date" ASC;`;
        pool.query(query)
            .then((response) => {
                res.send(response.rows);
            }).catch((error) => {
                console.log('GET created sessions failed', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

//POST Routes

//creates session of classes created by admin
//TODO: change 'form' language to 'session' 
router.post('/session', (req, res) => {
    console.log('session POST req.body', req.body);
    if (req.isAuthenticated()) {
        const formToAdd = req.body;
        const query = `INSERT INTO "wed_form" 
        ("start_date", "form_month", "form_year", "level_one", "level_two", 
        "level_three", "level_four", "level_five", "solo_jazz") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        pool.query(query, [formToAdd.newForm.startDate,
        formToAdd.newForm.month,
        formToAdd.newForm.year,
        formToAdd.newForm.levelOne,
        formToAdd.newForm.levelTwo,
        formToAdd.newForm.levelThree,
        formToAdd.newForm.levelFour,
        formToAdd.newForm.levelFive,
        formToAdd.newForm.soloJazz])
            .then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                console.log('POST session failed', error);
                res.sednStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
})

//adds registration from ADD DANCER form
//TODO: change 'form' language to 'session' 
router.post('/addDancer', (req, res) => {
    if (req.isAuthenticated()) {
        const regToAdd = req.body;
        const query = `INSERT INTO "registration" 
         ("wed_form_id", "first_name", "last_name", "email", "dancer_role", "admission", "first_hour", 
         "second_hour", "paid", "payment_type", "week_one", "week_two", "week_three", "week_four") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
        pool.query(query, [regToAdd.newReg.formId,
        regToAdd.newReg.firstName,
        regToAdd.newReg.lastName,
        regToAdd.newReg.email,
        regToAdd.newReg.role,
        regToAdd.newReg.admission,
        regToAdd.newReg.first,
        regToAdd.newReg.second,
        regToAdd.newReg.paid,
        regToAdd.newReg.paymentMethod,
        regToAdd.newReg.week1,
        regToAdd.newReg.week2,
        regToAdd.newReg.week3,
        regToAdd.newReg.week4])
            .then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                console.log('POST registration form add dancer failed', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

//UPDATE Routes
// TODO: find a better way to update the attendance
// edits attendance/payment for week 1
router.put('/weekOne/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('admin Update req.body', req.body);
        const regToUpdate = req.body;
        const id = req.params.id;
        const query = `UPDATE "registration" SET "week_one" = ($1) WHERE "id" = ($2);`;
        pool.query(query, [regToUpdate.week1, id])
            .then((results) => {
                console.log('registration updated');
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Error with update', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

//edits attendance/payment for week 2
router.put('/weekTwo/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('admin UPDATE req.body', req.body);
        const regToUpdate = req.body;
        const id = req.params.id;
        const query = `UPDATE "registration" SET "week_two" = ($1) WHERE "id" = ($2);`;
        pool.query(query, [regToUpdate.week2, id])
            .then((results) => {
                console.log('registration updated');
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Error with update', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

//edits attandance/payment for week 3
router.put('/weekThree/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('admin UPDATE req.body', req.body);
        const regToUpdate = req.body;
        const id = req.params.id;
        const query = `UPDATE "registration" SET "week_three" = ($1) WHERE "id" = ($2);`;
        pool.query(query, [regToUpdate.week3, id])
            .then((results) => {
                console.log('registration updated');
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Error with update', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

//edits attendance/payment for week 4
router.put('/weekFour/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('admin UPDATE req.body', req.body);
        const regToUpdate = req.body;
        const id = req.params.id;
        const query =  `UPDATE "registration" SET "week_four" = ($1) WHERE "id" = ($2);`;
        pool.query(query, [regToUpdate.week4, id])
        .then((results) => {
            console.log('registration updated');
            res.sendStatus(200);
        }).catch((error)=>{
            console.log('Error with update', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

//Delete Routes
// deletes the session from the created session table and database
router.delete('/session/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('session DELETE req.params.id', req.params.id);
        const query = `DELETE FROM "wed_form" WHERE "id" = $1;`;
        pool.query(query, [req.params.id])
            .then((response) => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Session DELETE error', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Trip = require('../models/Trip');
const { body, validationResult } = require('express-validator');
const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./assets/Tripimages/")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})

const upload=multer({storage:storage});


// ROUTE 1: Get All the trips using: GET "/api/trips/fetchalltrips". 
router.get('/fetchalltrips', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new trip using: POST "/api/trips/addtrip". Login required
router.post('/addtrip',upload.single("image"), fetchuser, [
// router.post('/addtrip', fetchuser, [
   ], async (req, res) => {
        try {
            const { title, package_description, departure_place,Fare,startdate,type,catagory,days } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const trip = new Trip({
                // title, package_description, departure_place,Fare,startdate,type,catagory,days
                title, package_description, departure_place,Fare,startdate,type,catagory,days,image:req.file.originalname
            })
            const savedtrip = await trip.save()

            res.json(savedtrip)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing trip using: PUT "/api/trips/updatetrip". Login required
router.put('/updatetrip/:id',upload.single("image"), fetchuser, async (req, res) => {

// router.put('/updatetrip/:id', fetchuser, async (req, res) => {
    const { title,  package_description, departure_place,Fare,startdate ,type,catagory,days } = req.body;
    try {
        // Create a newtrip object
        const newtrip = {};
        if (title) { newtrip.title = title };
        if (package_description) { newtrip.package_description = package_description };
        if (departure_place) { newtrip.departure_place = departure_place};
        if (Fare) { newtrip.Fare = Fare };
        if (startdate) { newtrip.startdate = startdate};
        if (type) { newtrip.type = type};
        if (catagory) { newtrip.catagory = catagory};
        if (days) { newtrip.days = days};

        newtrip.image=req.file.originalname;
        // Find the trip to be updated and update it
        let trip = await Trip.findById(req.params.id);
        if (!trip) { return res.status(404).send("Not Found") }

        // if (trip.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }
        trip = await Trip.findByIdAndUpdate(req.params.id, { $set: newtrip }, { new: true })
        res.json({ trip });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing trip using: DELETE "/api/trips/deletetrip". Login required
router.delete('/deletetrip/:id', fetchuser, async (req, res) => {
    try {
        // Find the trip to be delete and delete it
        let trip = await Trip.findById(req.params.id);
        if (!trip) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this trip
        // if (trip.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }

        trip = await Trip.findByIdAndDelete(req.params.id)
        res.json({ "Success": "trip has been deleted", trip: trip });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router
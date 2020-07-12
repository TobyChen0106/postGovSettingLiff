const express = require("express");
const router = express.Router();
const OfficialUser = require('../models/OfficialUser');
const Password = require('../models/Password');
const PostOffice = require('../models/PostOffice');

router.post('/setData', (req, res) => {
    const lineID = req.body.lineID;
    OfficialUser.findOne({ lineID: lineID }, (err, data) => {
        if (err) {
            const time = new Date();
            console.log(time, err);
        } else if (!data) {
            res.json(null);
        } else {
            PostOffice.findOne({ storeCd: data.storeCd }, (err, postData) => {
                if (err) {
                    const time = new Date();
                    console.log(time, err);
                } else if (!postData) {
                    res.json(null);
                } else {
                    const time = new Date()
                    if(req.body.now){
                        postData.number_plate_now = req.body.now;
                        postData.number_plate_updateTime = time.toString();
                        postData.save();
                    }else if(req.body.now){
                        postData.number_plate_total = req.body.total;
                        postData.number_plate_updateTime = time.toString();
                        postData.save();
                    }
                    res.json(postData);
                }
            })
        }
    });
});

router.post('/getData', (req, res) => {
    const lineID = req.body.lineID;
    OfficialUser.findOne({ lineID: lineID }, (err, data) => {
        if (err) {
            const time = new Date();
            console.log(time, err);
        } else if (!data) {
            res.json(null);
        } else {
            PostOffice.findOne({ storeCd: data.storeCd }, (err, postData) => {
                if (err) {
                    const time = new Date();
                    console.log(time, err);
                } else if (!postData) {
                    res.json(null);
                } else {
                    res.json(postData);
                }
            })
        }
    });
});

module.exports = router;
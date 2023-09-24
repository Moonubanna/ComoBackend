const express = require('express');
const router = express.Router();
const Joi = require('joi');
const axios = require('axios');
const FormData = require('form-data');
const userService = require('../services/userService');
const settings = require('../../config/settings');
const globalFunction = require('../../utils/globalFunction');
//const timezoneList = require('../../utils/timezoneList');
const CONSTANTS = require('../../utils/constants');
let apiSuccessRes = globalFunction.apiSuccessRes;
let apiSuccessResHtml = globalFunction.apiSuccessResHtml;
let apiUnauthorizedRes = globalFunction.apiUnauthorizedRes;
///Comment
let apiErrorRes = globalFunction.apiErrorRes;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const xmlParser = require('xml2json-light');
const browser = require('browser-detect');
const qs = require('querystring');


async function Bcomoqrcode(req, res) {
    try {
        let id = req.query.id;

        let getBcomoData = await userService.getBcomoData(id);

        if (getBcomoData.statusCode === CONSTANTS.SUCCESS) {
            return res.status(200).json(getBcomoData.data);


        } else {
            return apiErrorRes(req, res, 'Error');
        }
    } catch (error) {
        console.log(error);
    }

}
async function scans(req, res) {
    try {
        let id = req.query.id;

        let getBcomoData = await userService.scans(id);

        if (getBcomoData.statusCode === CONSTANTS.SUCCESS) {
            return res.status(200).json(getBcomoData.data);


        } else {
            return apiErrorRes(req, res, 'Error');
        }
    } catch (error) {
        console.log(error);
    }

}

router.get('/qrcode', Bcomoqrcode);
router.get('/scans', scans);

module.exports = router;
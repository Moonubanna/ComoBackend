'use strict';
const settings = require('../../config/settings');
const globalFunction = require('../../utils/globalFunction');
const CONSTANTS = require('../../utils/constants');
const userModel = require('../../routes/model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let resultdb = globalFunction.resultdb;
const { poolPromise, sql } = require('../../db');
const axios = require('axios');
const SALT_WORK_FACTOR = 10;


let scans = async (user_id) => {
	try {

		const pool = await poolPromise;
		const result = await pool.request()
			.input('user_id', sql.VarChar(50), user_id)
			.query("select id as uuid, user_id,code,name from qrcode_logs where user_id = @user_id");

		if (result.recordsets === null || result.recordsets.length <= 0) {
			return resultdb(CONSTANTS.NOT_FOUND, CONSTANTS.DATA_NULL);
		} else {
			return resultdb(CONSTANTS.SUCCESS, result.recordsets[0]);
		}
	} catch (error) {
		console.log(error);
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};

let getBcomoData = async (id) => {
	try {

		const pool = await poolPromise;
		let diskname = "";
		let phonenumber = "";
		console.log(id);
		switch (id) {
			case "1":
				diskname = 'Pizza';
				phonenumber = 11;
				break;
			case "2":
				diskname = 'Burger';
				phonenumber = 22;
				break;
			case "3":
				diskname = 'Dosa';
				phonenumber = 33;
				break;
			case "4":
				diskname = 'Samosa';
				phonenumber = 44;
				break;
			case "5":
				diskname = 'Patties';
				phonenumber = 55;
				break;
			case "6":
				diskname = 'Vada pav';
				phonenumber = 66;
				break;
			default:
				diskname = 'Nothing';
				phonenumber = 0;
		}
		let currentdate = globalFunction.currentDateTimeStamp();
		await pool.request()
			.input('user_id', sql.Int, 1)
			.input('code', sql.Int, id)
			.input('name', sql.VarChar(150), diskname)
			.input('currentdate', sql.BigInt, currentdate)
			.query("insert into qrcode_logs (user_id, code, name,created_at) values(@user_id,@code,@name,@currentdate)");
		let response = { 'time': currentdate, 'message': 'I would like to order a ' + diskname + ' please , Thanks ', 'dish': diskname, 'phoneNumber': '+1555' + phonenumber }
		return resultdb(CONSTANTS.SUCCESS, response);

	} catch (error) {
		console.log(error);
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};
module.exports = {
	getBcomoData,
	scans
};
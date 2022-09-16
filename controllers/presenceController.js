/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

// library definitions
const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');

// helper definitions
const catchAsync = require('../utils/catchAsync');
const Logger = require('../utils/Logger');
const discord = require("../utils/discordHelper");
const meHelper = require('../utils/meHelper');
const ConfigHelper = require('../utils/ConfigHelper');

const updatePresence = catchAsync(async (req, res) => {
	let flag = req.body.flag;
    const valConfig = await ConfigHelper.getValorantConfig();

	if (flag & 1) {
		console.log(req.body.status + " status") // debug
		if(req.body.status) 
		valConfig.queueId = req.body.status;
	}
	if (flag & 2) {
		valConfig.competitiveTier = req.body.rank;
	}
	if (flag & 4) {
		valConfig.leaderboardPosition = req.body.position;
	}
	if (flag & 8) {
		console.log("level " + req.body.level) // debug
		valConfig.accountLevel = req.body.level;
	}
	if (flag & 16) {
		if(req.body.ally) 
		valConfig.partyOwnerMatchScoreAllyTeam = req.body.ally;
	}
	if (flag & 32) {
		if(req.body.enemy) 
		valConfig.partyOwnerMatchScoreEnemyTeam = req.body.enemy;
	}
	if (flag & 64) {
		if(req.body.playerTitleId) 
		valConfig.playerTitleId = req.body.playerTitleId;
	}

	Logger.debug(`Updating presence :: Flag: ${flag} | ${JSON.stringify(valConfig)}`);

	await meHelper.updateRequest(valConfig);
	await discord.update(); 
    await res.status(httpStatus.OK).send();
});

const currentSettings = catchAsync(async (req, res) => {
    const valConfig = await ConfigHelper.getValorantConfig();
	
	let status;
	if(valConfig.sessionLoopState == "INGAME") status = "online";
	if(valConfig.partyId == "" || valConfig.partyId == null) status = "offline"; 
	if(valConfig.sessionLoopState !== "MENUS" && valConfig.sessionLoopState !== "INGAME") status = "stream";
	if(valConfig.isValid == false) status = "dnd";
	if(valConfig.sessionLoopState == "MENUS" && valConfig.isIdle == true) status = "away";

	const data = {
		queueId: valConfig.queueId,
		competitiveTier: valConfig.competitiveTier,
		leaderboardPosition: valConfig.leaderboardPosition,
		accountLevel: valConfig.accountLevel,
		partyOwnerMatchScoreAllyTeam: valConfig.partyOwnerMatchScoreAllyTeam,
		partyOwnerMatchScoreEnemyTeam: valConfig.partyOwnerMatchScoreEnemyTeam,
		playerCardId: valConfig.playerCardId,
		playerTitleId: valConfig.playerTitleId,
		status: status
	}

	Logger.debug(`Fufilling current settings request :: ${JSON.stringify(data)}`);

	res.status(httpStatus.OK).send(data);
});

module.exports = {
    updatePresence,
    currentSettings
}
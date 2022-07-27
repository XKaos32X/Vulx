const fs = require('fs');

class Helper {
	constructor() {
		this.valorantConfig;
		this.leagueConfig;
		this.vulxConfig;
		this.experimentsConfig;
	}

	// initialization functions
	async _doInitialize() {
		await this._initializeDirectory();
		await this._initializeConfig();
    }

    async _initialize() {
        if(!this.initializationPromise) {
            this.initializationPromise = this._doInitialize();
        }
        return this.initializationPromise;
    }

	async _initializeConfig() {
		this.valorantConfig = await this._getAndCreateIfNotExistsValorantConfig();
		this.leagueConfig = await this._getAndCreateIfNotExistsLeagueConfig();
		this.vulxConfig = await this._getAndCreateIfNotExistsVulxConfig();
		this.experimentsConfig = await this._getAndCreateIfNotExistsExperimentsConfig();
	}

	async _initializeDirectory() {
		if (!fs.existsSync('./cfg')) {
			fs.mkdirSync('./cfg');
		}
	}

	async _getAndCreateIfNotExistsValorantConfig() {
		if (!fs.existsSync('./cfg/valorant.json')) {
			await this._createValorantConfig();
		} else {
			await this._getValorantConfig();
		}

		return this.valorantConfig;
	}

	async _getAndCreateIfNotExistsLeagueConfig() {
		if (!fs.existsSync('./cfg/league.json')) {
			await this._createLeagueConfig();
		} else {
			await this._getLeagueConfig();
		}

		return this.leagueConfig;
	}

	async _getAndCreateIfNotExistsVulxConfig() {
		if (!fs.existsSync('./cfg/vulx.json')) {
			await this._createVulxConfig();
		} else {
			await this._getVulxConfig();
		}

		return this.vulxConfig;
	}

	async _getAndCreateIfNotExistsExperimentsConfig() {
		if (!fs.existsSync('./cfg/experiments.json')) {
			await this._createExperimentsConfig();
		} else {
			await this._getExperimentsConfig();
		}

		return this.experimentsConfig;
	}

	async _createValorantConfig() {
		const config = {
			isValid:true,
			sessionLoopState:'INGAME',
			partyOwnerSessionLoopState:'INGAME',
			customGameName:'',
			customGameTeam:'',
			partyOwnerMatchMap:'',
			partyOwnerMatchCurrentTeam:'',
			partyOwnerMatchScoreAllyTeam:0,
			partyOwnerMatchScoreEnemyTeam:0,
			partyOwnerProvisioningFlow:'Invalid',
			provisioningFlow:'Invalid',
			matchMap:'',
			partyId:'58DsGJ20-9prT-7Jy8-h7hS-YXF1YXBsYXlz',
			isPartyOwner:true,
			partyState:'DEFAULT',
			partyAccessibility:'CLOSED',
			maxPartySize:5,
			queueId:'Valorant Profile Editor',
			partyLFM:false,
			partyClientVersion:'release-04.08-shipping-15-701907',
			partySize:1,
			tournamentId:'',
			rosterId:'',
			partyVersion:1650719279092,
			queueEntryTime:'0001.01.01-00.00.00',
			playerCardId:'30b64514-440d-1261-f863-6bbb180263f9',
			playerTitleId:'00d4d326-4edc-3229-7c28-129d3374e3ad',
			preferredLevelBorderId:'',
			accountLevel:200,
			competitiveTier:2,
			leaderboardPosition:0,
			isIdle:true
		}
	
		await fs.writeFileSync("./cfg/valorant.json", JSON.stringify(config));
		this.valorantConfig = config;
	}

	async _createLeagueConfig() {
		const config = {
			"championId":"25",
			"companionId":"15008",
			"damageSkinId":"1",
			"gameId":"5840315011",
			"gameMode":"CLASSIC",
			"gameQueueType":"NORMAL",
			"gameStatus":"inGame",
			"iconOverride":"",
			"isObservable":"ALL",
			"level":"167",
			"mapId":"11",
			"mapSkinId":"55",
			"masteryScore":"357",
			"profileIcon":"1",
			"puuid":"a8e43daa-f78c-516b-871c-565503dd9b5e",
			"queueId":"Hiii!!!",
			"rankedLeagueDivision":"III",
			"rankedLeagueQueue":"RANKED_SOL0_5x5",
			"rankedLeagueTier":"SILVER",
			"rankedLosses'":"O",
			"rankedPrevSeasonDivision":"IV",
			"rankedPrevSeasonTier":"SILVER",
			"rankedSplitRewardLever":"0",
			"rankedWins":"38",
			"skinVariant":"91000",
			"skinname":"Talon",
			"timeStamp":"1646014091142"
		}
	
		await fs.writeFileSync("./cfg/league.json", JSON.stringify(config));
		this.leagueConfig = config;
	}

	async _createVulxConfig() {
		const config = {
			port: 80,
			discordRpc: false,
			experimental: false,
			firstLaunch: false
		}
	
		await fs.writeFileSync("./cfg/vulx.json", JSON.stringify(config));
		this.vulxConfig = config;
	}

	async _createExperimentsConfig() {
		const config = {
			league: false
		}
	
		await fs.writeFileSync("./cfg/experiments.json", JSON.stringify(config));
		this.experimentsConfig = config;
	}

	async _getValorantConfig() {
		const config = JSON.parse(fs.readFileSync("./cfg/valorant.json"));
		this.valorantConfig = config;
		return config;
	}

	async _getLeagueConfig() {
		const config = JSON.parse(fs.readFileSync("./cfg/league.json"));
		this.leagueConfig = config;
		return config;
	}

	async _getVulxConfig() {
		const config = JSON.parse(fs.readFileSync("./cfg/vulx.json"));
		this.vulxConfig = config;
		return config;
	}

	async _getExperimentsConfig() {
		const config = JSON.parse(fs.readFileSync("./cfg/experiments.json"));
		this.experimentsConfig = config;
		return config;
	}

	async getValorantConfig() {
		await this._initialize();

		return this.valorantConfig;
	}

	async getLeagueConfig() {
		await this._initialize();

		return this.leagueConfig;
	}

	async getVulxConfig() {
		await this._initialize();

		return this.vulxConfig;
	}

	async getExperimentsConfig() {
		await this._initialize();

		return this.experimentsConfig;
	}
}

module.exports = new Helper();
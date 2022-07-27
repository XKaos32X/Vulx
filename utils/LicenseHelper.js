const axios = require('axios');
const ValorantAPI = require('./ValorantAPI');

class Client {
    constructor() {
        this.axios = axios.create();
		this.puuid = null;
		this.region = null;
		this.license = null;
		this.licenseServer = 'http://localhost:3001';
		this.isDev = false;
    }
    
    // initialization functions
    async _doInitialize() {
		await this._initializeValorantAPI();
    }

    async _initialize() {
        if(!this.initializationPromise) {
            this.initializationPromise = this._doInitialize();
        }
        return this.initializationPromise;
    }

	async _initializeValorantAPI() {
		this.puuid = await ValorantAPI.getPUUID();
		this.region = await ValorantAPI.getRegion();
	}

	async checkLicense() {
		await this._initialize()

		return await this.axios.get(this.licenseServer + '/check-license', {
			data: {
				puuid: this.puuid,
				region: this.region,
				license: this.license
			}
		}).then(res => {
			return res.status === 200
		}).catch(err => {
			return err.status === 200
		})
	}

	async checkDev() {
		await this._initialize()

		return await this.axios.get(this.licenseServer + '/isDev', {
			data: {
				puuid: this.puuid,
				region: this.region,
				license: this.license
			}
		}).then(res => {
			this.isDev = res.status === 200;
			return res.status === 200;
		}).catch(err => {
			this.isDev = err.status === 200;
			return err.status === 200;
		})
	}
}

module.exports = new Client();
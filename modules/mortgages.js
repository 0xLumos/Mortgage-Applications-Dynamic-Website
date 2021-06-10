/** @module Mortgages */
import sqlite from 'sqlite-async'
/**
 * Mortgages
 * ES6 module that handles adding mortgages .
 */
class Mortgages {
/**
   * Create a mortgage object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
*/
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = 'CREATE TABLE IF NOT EXISTS mortgages\
				(mortgage_id INTEGER PRIMARY KEY AUTOINCREMENT, amount INTEGER, deposit INTEGER, years INTEGER);'
			await this.db.run(sql)
			return this
		})()
	}
    async add(amount,deposit,years) {
        let sql = `SELECT COUNT(mortgage_id) as records FROM mortgages ;`
// 		const data = await this.db.get(sql)
        console.log(amount)
        console.log(deposit)
        console.log(years)
		sql = `INSERT INTO mortgages(amount,deposit,years) VALUES("${amount}", "${deposit}", "${years}")`
		await this.db.run(sql)
		return true
	}

	/**
	 * adds a new mortgage
	 * @param {String} the chosen movie name
	 * @param {String} pass the description
	 * @param {String} pass the photo
	 * @param {String} pass the photo
	 * @returns {Boolean} returns true if the new show has been added
	 */
	async all() {
		const sql = `SELECT mortgages.* FROM mortgages `
        const mortgage = await this.db.all(sql)
		return mortgage
        
	}
    async close() {
		await this.db.close()
	}
    


	}



export default Mortgages
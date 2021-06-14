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
			// we need this table to store the mortgages details
			const sql = 'CREATE TABLE IF NOT EXISTS mortgages\
				(mortgage_id INTEGER PRIMARY KEY AUTOINCREMENT, amount INTEGER, deposit INTEGER, years INTEGER , mp INTEGER , ci INTEGER);'
			await this.db.run(sql)
			return this
		})()
	}
    async add(amount,deposit,years) {
        let sql = `SELECT COUNT(mortgage_id) as records FROM mortgages ;`
// 		const data = await this.db.get(sql)
// 		CALCAULATE MONTHLY INTEREST :
         // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
        // P = principal loan amount
        // i = monthly interest rate
        // n = number of months required to repay the loan
//      CALCULATE COMPOUND INTEREST
//        = P [(1 + i)n – 1]
        var interest_rate = 3/100
        console.log(amount)
        console.log(deposit)
        console.log(years)
        var compound_interest = amount * ((1 + interest_rate)**(years * 12)-1)
        var ci_rounded = parseFloat(compound_interest.toFixed(2)); 
        console.log(ci_rounded)
        //monthly payment
        var mp = amount * (interest_rate * (1+interest_rate)**(years * 12)) / ((1 + interest_rate)**(years*12)-1)
        var mp_rounded = parseFloat(mp.toFixed(2)); 
        console.log(mp_rounded)
		sql = `INSERT INTO mortgages(amount,deposit,years,mp,ci) VALUES("${amount}", "${deposit}", "${years}" , "${mp_rounded}","${ci_rounded}")`
		await this.db.run(sql)
		return true
	}

	/**
	 * adds a new mortgage
	 * @param {Integer} the amount to borrow
	 * @param {Integer} pass the deposit 
	 * @param {Integer} pass the period of time of the loan
	 * @returns {Boolean} returns true if the new mortgage has been added
	 */
	async all() {
		const sql = `SELECT mortgages.* FROM mortgages  `
        const mortgage = await this.db.all(sql)
		return mortgage
        
	}
    async close() {
		await this.db.close()
	}
    


	}



export default Mortgages
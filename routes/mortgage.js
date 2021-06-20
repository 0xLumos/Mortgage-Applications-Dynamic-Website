import Router from 'koa-router'

const router = new Router({ prefix: '/mortgage' })
import Mortgages from '../modules/mortgages.js'
const dbName = 'website.db'


router.get('/', async ctx => {
    const mortgage = await new Mortgages(dbName)
	try {
        function calculate() {
            var amount = document.getElementById("amount").value;
            var months = document.getElementById("months").value;
            var payment = ((amount / months) + (3/100));
            document.getElementById("res").innerHTML = payment;
}
		await ctx.render('index', ctx.hbs) 
	} catch(err) {
        ctx.hbs.error = err.message
		console.log(ctx.hbs.error)
        await ctx.render('error', ctx.hbs)
	}
})
// redirect the user to an add mortgage form 
router.get('/add', async ctx => {
	
    console.log(ctx.hbs)
	await ctx.render('add', ctx.hbs)
})
// insert data of the mortgage 
// to the database and redirect to home page
router.post('/add', async ctx =>{
    const mortgage = await new Mortgages(dbName)
	try {
		const body = ctx.request.body
		await mortgage.add(body.amount,body.deposit,body.years) 
        const referrer = '/'
        return ctx.redirect(`${referrer}?msg=Mortgage added !`)
        
        
    } catch(err) {
        console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('add', ctx.hbs)
	} 
    finally {
        await mortgage.close()
    }
})

export default router
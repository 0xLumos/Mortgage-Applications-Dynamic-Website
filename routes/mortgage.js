import Router from 'koa-router'

const router = new Router({ prefix: '/secure' })
import Mortgages from '../modules/mortgages.js'
const dbName = 'website.db'


router.get('/', async ctx => {
    const mortgage = await new Mortgages(dbName)
	try {
		await ctx.render('index', ctx.hbs) // the second parameter is the object being passed to the template.
	} catch(err) {
        ctx.hbs.error = err.message
		console.log(ctx.hbs.error)
        await ctx.render('error', ctx.hbs)
	}
})

router.get('/add', async ctx => {
	
    console.log(ctx.hbs)
	await ctx.render('add', ctx.hbs)
})
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
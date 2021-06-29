import Router from 'koa-router'

const router = new Router({ prefix: '/mortgage' })
import Mortgages from '../modules/mortgages.js'
const dbName = 'website.db'


router.get('/', async ctx => {
    const mortgage = await new Mortgages(dbName)
	try {
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
        let id = ctx.session.id
        console.log(id)
		await mortgage.add(body.amount,body.deposit,body.years,id) 
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
router.get('/delete/:id', async ctx => {
	ctx.hbs.id = ctx.params.id
    console.log(ctx.hbs)
    
	await ctx.render('delete', ctx.hbs)
})
// insert data of the mortgage 
// to the database and redirect to home page
router.post('/delete', async ctx =>{
    const mortgage = await new Mortgages(dbName)
	try {
        ctx.hbs.id = ctx.params.id
        console.log(ctx.hbs)
        await mortgage.delete(ctx.params.id)
        const referrer = '/'
        return ctx.redirect(`${referrer}?msg=Mortgage deleted !`)
        
        
    } catch(err) {
        console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('delete', ctx.hbs)
	} 
    finally {
        await mortgage.close()
    }
})
// redirect the user to an add mortgage form 
router.get('/data', async ctx => {
	
    console.log(ctx.hbs)
	await ctx.render('data', ctx.hbs)
})
// insert data of the mortgage 
// to the database and redirect to home page
router.post('/data', async ctx =>{
    const mortgage = await new Mortgages(dbName)
	try {
		const body = ctx.request.body
        let id = ctx.session.id
        console.log(id)
		await mortgage.add(body.amount,body.deposit,body.years,id) 
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
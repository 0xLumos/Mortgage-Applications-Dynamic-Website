
import Router from 'koa-router'

const router = new Router()

import Accounts from '../modules/accounts.js'
import Mortgages from '../modules/mortgages.js'
const dbName = 'website.db'

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
    const account = await new Accounts(dbName)
	const mortgage = await new Mortgages(dbName)
	try {
        console.log("WORIKING")
        console.log(ctx.session.id)
		ctx.hbs.records = await mortgage.all(ctx.session.id)
		console.log(JSON.stringify(ctx.hbs, null, 2))
		await ctx.render('index', ctx.hbs) // the second parameter is the object being passed to the template.
	} catch(err) {
        ctx.hbs.error = err.message
		console.log(ctx.hbs.error)
        await ctx.render('error', ctx.hbs)
	}
})


/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('register'))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', async ctx => {
	const account = await new Accounts(dbName)
	try {
		// call the functions in the module
		await account.register(ctx.request.body.user, ctx.request.body.pass, ctx.request.body.email)
        const login = await account.login(ctx.request.body.user,ctx.request.body.pass)
        if (login){
            try {
                const body = ctx.request.body
                console.log("LOG IN ")
                ctx.session.id = login
                ctx.session.authorised = true
                const referrer = body.referrer || '/'
                return ctx.redirect(`${referrer}?msg=you are now logged in...`)
            } catch(err) {
                console.log(err)
                ctx.hbs.msg = err.message
                await ctx.render('login', ctx.hbs)
}
        }
		ctx.redirect(`/?msg=new user "${ctx.request.body.user}" added, you need to log in`)
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('register', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/login', async ctx => {
	console.log(ctx.hbs)
	await ctx.render('login', ctx.hbs)
})

router.post('/login', async ctx => {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		const id = await account.login(body.user, body.pass)
		ctx.session.authorised = true
        ctx.session.id = id
		const referrer = body.referrer || '/'
		return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
    ctx.session.id = null
	ctx.redirect('/?msg=you are now logged out')
})

export default router

const { test, describe , expect,beforeEach}  = require('@playwright/test')

const {loginWith,createNote} = require('./helper')

describe('Note app' , () => {
    beforeEach(async ({page, request}) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users',{
            data:  {
                name: 'ayman',
                username: 'ayman',
                password : 'ayman2002$'
            }
        })
        await page.goto('/')
    }) 
    test('front page can be opened', async ({page}) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        
    })
    test('login form can be opened',async({page}) =>{
        await loginWith(page,'ayman','ayman2002$')

        await expect(page.getByText('ayman logged-in')).toBeVisible()
    })
    test('login fails with wrong password', async ({page}) => {
        await loginWith(page,'ayman','ayman20cccccc02$')

        const errorDiv = await page.locator('.notification')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(page.getByText('ayman logged-in')).not.toBeVisible()

    })
    describe('when logged in' ,() => {
        beforeEach(async ({page}) => {
            await loginWith(page,'ayman','ayman2002$')
    
            
        })
        test('a new note can be created', async ({ page }) => {
            await createNote(page,'a note created by playwright',true)
            await expect(page.getByText('a note created by playwright')).toBeVisible();
        })
        describe('and a note exists',() => {
            beforeEach(async ({page}) => {
                await createNote(page,'another note by playwright')
            })
            test('importance can be changed',async ({ page }) => {
                await page.getByRole('button',{name : 'make not important '}).click()
                await expect(await page.getByText('make important')).toBeVisible()
            })
        })
        describe('when logged in ', () => {
            beforeEach(async ({page}) => {
                await createNote(page,'first note',true)
                await createNote(page,'second note', true)
                await createNote(page,'third note', true )
            })
            test('one of those can be made no important',async ({page}) => {
                const otherNoteText = await page.getByText('second note')
                const otherNoteElement = await otherNoteText.locator('..')
                await otherNoteElement.getByRole('button',{name:'make not important'}).click()
                await expect(otherNoteElement.getByText('make important')).toBeVisible()
            })
        })

    })


  


    
})
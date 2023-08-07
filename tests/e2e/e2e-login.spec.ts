import {test, expect} from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { screenshotOnFailure } from '../../helpers'

test.describe("Login flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

       await homePage.visit()
    })

    test.afterEach(screenshotOnFailure)

    test("Negative Scenario for Login", async ({page}) => {
        await homePage.clickOnSignIn()
        await loginPage.login('invalid username', 'invalid password')
        await loginPage.assertErrorMessage()
      
        // await page.screenshot({ path: 'error.png' });
        
    })

    test("Positive Scenario for Login", async ({page}) => {
        await homePage.clickOnSignIn()
        await loginPage.login('taras', 'taras123')

        const accountNameTab = await page.locator('.css-130qef4')
        await expect(accountNameTab).toBeVisible()
        // await page.screenshot({ path: 'logout.png' });
    })
}) 




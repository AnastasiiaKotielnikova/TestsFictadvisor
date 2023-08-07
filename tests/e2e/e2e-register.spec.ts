import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { RegisterPage } from '../../page-objects/RegisterPage'
import { screenshotOnFailure } from '../../helpers'
import { ModelRegister } from '../../models/modelRegister'

test.describe("Register flow", () => {
    let homePage: HomePage
    let registerPage: RegisterPage
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        registerPage = new RegisterPage(page)
        await homePage.visit()
    })

    test.afterEach(screenshotOnFailure)

    test("Positive Scenario for Register", async ({page}) => {
        await homePage.clickOnRegister()
        const registrationUser = Object.assign(new ModelRegister(), {
            username: 'olya',
            lastname: 'Бойко',
            firstname: 'Ольга',
            middlename: 'Петрівна',
            email: 'lufyuyotri@gufum.com',
            password: 'Olya123456',
            passwordConfirmation: 'Olya123456',
        })
        await registerPage.register(registrationUser)

        await page.getByLabel('Погоджуюсь на обробку персональних даних').check();
        expect (await page.getByLabel('Погоджуюсь на обробку персональних даних')).toBeChecked();
        expect (await page.getByLabel('Погоджуюсь на обробку персональних даних').isChecked()).toBeTruthy();

        await registerPage.registerBtn()

        await registerPage.registerMessage()
        // await page.screenshot({ path: 'register.png' });

    })
})
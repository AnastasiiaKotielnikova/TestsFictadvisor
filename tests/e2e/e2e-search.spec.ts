import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { screenshotOnFailure } from '../../helpers'

test.describe("Search for a teacher", () => {
    let homePage: HomePage
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
       await homePage.visit()
    })

    test.afterEach(screenshotOnFailure)

    test("Valid search for a teacher", async ({page}) => {
        await page.click('text=Викладачі')

        await page.getByPlaceholder('Оберіть викладача').click()

        await page.type('.SearchPage_input__2A9ZZ', 'Артем')
        await page.keyboard.press('Enter')

       const cardTeacher = await page.locator('ul > a')
       await expect(cardTeacher).toHaveCount(4)
        // await page.screenshot({ path: 'cardTeacher.png' });
})

test("Invalid search for a teacher", async ({page}) => {
    await page.click('text=Викладачі')

    await page.getByPlaceholder('Оберіть викладача').click()

    await page.type('.SearchPage_input__2A9ZZ', 'Ermilov')
    await page.keyboard.press('Enter')

    const errorMessage = await page.locator('.css-1qdec2j')
    await expect(errorMessage).toContainText('Цього викладача не існує')
    // await page.screenshot({ path: 'errorMessage.png' });
})

})
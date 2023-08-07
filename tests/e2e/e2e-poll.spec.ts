import {test, expect} from '@playwright/test'
import {HomePage} from '../../page-objects/HomePage'
import {LoginPage} from '../../page-objects/LoginPage'

test.describe("Poll flow", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        await homePage.visit()
    })

    test("Displaying the 'survey' tab with a verified user", async ({page}) => {
        await homePage.clickOnSignIn()
        await loginPage.login('fictadvisor@gmail.com', 'dev123')

        await page.click('text=Опитування')

        const message = await page.locator('.css-1n548we')
        await expect(message).toContainText('Ти вже пройшов опитування за всіх викладачів, що викладали в тебе в цьому семестрі, дочекайся наступного семестру, аби знов залишити відгук. Сподіваємось ти добре закрив сесію!')
        // await page.screenshot({ path: 'user1.png' })
    })

    test("Displaying the 'survey' tab with an unverified user", async ({page}) => {
        await homePage.clickOnSignIn()
        await loginPage.login('taras', 'taras123')

        await page.click('text=Опитування')

        const errorMessage = await page.locator('.css-1z69di')
        await expect(errorMessage).toContainText('Ти ще не обрав вибіркові на цей семестр!Обери свої вибіркові в профілі у вкладці "Мої вибіркові"')
        // await page.screenshot({ path: 'user2.png' })
    })
})
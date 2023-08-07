import {expect, Locator, Page} from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly userNameInput: Locator
    readonly userPasswordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    constructor(page: Page){
        this.page = page
        this.userNameInput = page.locator('[name="username"]')
        this.userPasswordInput = page.locator('[name="password"]')
        this.submitButton = page.locator('[type="submit"]')
        this.errorMessage = page.locator('.Input_large-text-icon-input__CGjtW')
    }

    async login(username: string, password: string) {
        await this.userNameInput.type(username)
        await this.userPasswordInput.type(password)
        await this.submitButton.click()
    }

    async assertErrorMessage(){
        await expect(this.errorMessage).toContainText('Пошта або юзернейм Користувача з таким паролем та поштою не знайдено')
    }
}
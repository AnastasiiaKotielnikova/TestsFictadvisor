import {expect, Locator, Page} from '@playwright/test'
import { ModelRegister } from '../models/modelRegister'


export class RegisterPage {
    readonly page: Page
    readonly userNameInput: Locator
    readonly lastNameInput: Locator
    readonly firstNameInput: Locator
    readonly middleNameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly passwordConfirmationInput: Locator
    readonly submitBtn: Locator
    readonly message: Locator

    constructor(page:Page) {
        this.page = page
        this.userNameInput = page.locator('[name="username"]')
        this.lastNameInput = page.locator('[name="lastName"]')
        this.firstNameInput = page.locator('[name="firstName"]')
        this.middleNameInput = page.locator('[name="middleName"]')
        this.emailInput = page.locator('[name="email"]')
        this.passwordInput = page.locator('[name="password"]')
        this.passwordConfirmationInput = page.locator('[name="passwordConfirmation"]')
        this.submitBtn = page.locator('[type="submit"]')
        this.message = page.locator('.RegistrationEmailConfirmationPage_headline__yijZC')
    }

    async register(registrationUser: ModelRegister){
       await this.userNameInput.type(registrationUser.username)
       await this.lastNameInput.type(registrationUser.lastname)
       await this.firstNameInput.type(registrationUser.firstname)
       await this.middleNameInput.type(registrationUser.middlename)
       await this.emailInput.type(registrationUser.email)
       await this.page.getByPlaceholder('вибери зі списку').click()
       await this.page.click('text=ІА-02')
       await this.passwordInput.type(registrationUser.password)
       await this.passwordConfirmationInput.type(registrationUser.passwordConfirmation)
    }

    async registerBtn(){
        await this.submitBtn.click()
    }

    async registerMessage() {
        await expect(this.message).toContainText('Перевір свою пошту')
    }
}
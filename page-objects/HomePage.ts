import {Locator, Page} from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly signInBtn: Locator
    readonly registerInBtn: Locator

    constructor(page:Page){
        this.page = page
        this.signInBtn = page.locator('.css-82pg9d')
        this.registerInBtn = page.locator('.css-1rr6zd0')
    }

    async visit() {
        await this.page.goto('https://fictadvisor.com/')
    }

    async clickOnSignIn(){
        await this.signInBtn.click()
    }

    async clickOnRegister(){
        await this.registerInBtn.click()
    }
}
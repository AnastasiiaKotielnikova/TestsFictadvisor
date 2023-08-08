import {test, expect} from '@playwright/test'

test.describe.parallel("API Testing", () => {
    const baseURL = 'https://api.fictadvisor.com'

    test("Simple API Test - Assert Response Status", async ({request}) => {
        const response = await request.get(`${baseURL}/v2/teachers`)
        expect(response.status()).toBe(200) 

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })

    test("Simple API Test - Assert Response Status by ID", async ({request}) => {
        const response = await request.get(`${baseURL}/v2/teachers/e10c9d3e-2960-4b59-a420-9b8f2323bd39`)
        expect(response.status()).toBe(200) 

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })

    test("Simple API Test - Confirming the request using the request parameters", async ({request}) => {
        const response = await request.get(`${baseURL}/v2/teachers`, {
            params: {
                firstName: 'Олена',
                lastName: 'Землянська'
            }
        })
        console.log(await response.json())
        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(200)
    })

    test("Simple API Test - Assert Invalid Endpoint", async ({request}) => {
        const response = await request.get(`${baseURL}/v2/teachers/non-existing-endpoint`)
        expect(response.status()).toBe(400) 
    })

    test("GET Request - Get User Detail", async ({request}) => {
        const response = await request.get(`${baseURL}/v2/teachers/0902dca5-3531-4705-a012-21880582d974`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.firstName).toBe('Ілона')
        expect(responseBody.lastName).toBe('Жовта')
        expect(responseBody.avatar).toBeTruthy()  
    })

    test("POST Request - Create New User", async ({request}) => {
        const registerResponse = await request.post(`${baseURL}/v2/auth/register`, {
            data: {
                student: {
                    groupId: 'b9c7e47c-6df8-4066-970e-a311cbaaaf11',
                    firstName: 'Тарас',
                    middleName: 'Тарасович',
                    lastName: 'Тарасенко',
                    isCaptain: false
            },
            user: {
                username: 'taras67',
                email: 'foltorilma@gufum.com',
                password: 'taras123'
            }
            }
                })
                expect(registerResponse.ok()).toBeTruthy();

                const loginResponse = await request.post(`${baseURL}/v2/auth/login`, {
                            data: {
                                "username": "taras67",
                                "password": "taras123",
                            }
                        })
                        const responseBody = JSON.parse(await loginResponse.text())
                        expect(loginResponse.status()).toBe(201)
                        expect(responseBody.refreshToken, responseBody.accessToken).toBeTruthy()        
    })

    test("POST Request - Login", async ({request}) => {
        const response = await request.post(`${baseURL}/v2/auth/login`, {
            data: {
                username: 'taras',
                password: 'taras123',
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(201)
        expect(responseBody.refreshToken, responseBody.accessToken).toBeTruthy()
    })

      test("POST Request - Login Fail", async ({request}) => {
        const response = await request.post(`${baseURL}/v2/auth/login`, {
            data: {
                username: "oleg78",
                password: 't123456',
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe('InvalidEntityIdException')
        expect(responseBody.message).toBe('user with such id is not found')
    })   

})

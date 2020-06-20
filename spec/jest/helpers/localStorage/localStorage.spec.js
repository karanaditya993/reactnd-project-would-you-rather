 import { localStorage } from '../../../helpers'

describe('localStorage', () => {
    let setItemSpy
    beforeEach(() => {
        setItemSpy = jest.spyOn(window.localStorage, 'setItem')
    })
    describe('set', () => {
        const testKey = 'TEST'
        const testVal = 'TEST_VAL'
        localStorage.set(testKey, testVal)
        expect(setItemSpy).toHaveBeenCalledTimes(0)
    })
})
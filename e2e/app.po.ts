import { browser, by, element } from 'protractor'

export class TestPage {
    navigateTo() {
        return browser.get('/')
    }

    getParagraphText() {
        return element(by.css('demo-root h1')).getText()
    }
}

import { Locator, Page } from "@playwright/test";

export class Navigation{
    readonly page: Page;
    readonly sectionOne: Locator;

    constructor(page:Page){
        this.page = page;
        this.sectionOne = page.getByTestId('home-section-card-form-elements');
    }

    async goToSectionOne(){
        await this.sectionOne.click();
    }
}
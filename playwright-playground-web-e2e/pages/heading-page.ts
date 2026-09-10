import { expect, Locator, Page } from "@playwright/test";

export class Heading{
    readonly page: Page;
    readonly heading: Locator;

    constructor(page: Page){
        this.page = page;
        this.heading = page.getByRole('heading', {name: 'PlayLab Training'})
    }

    async headingLoads(){
        await expect(this.heading).toBeVisible();
    }
}
import { expect, Locator, Page } from "@playwright/test";

export class DropDownPage{
    private readonly customDDWrapper: Locator;
    private readonly customDDButton: Locator;
    private readonly customDDSelectedValue: Locator;

    constructor(page: Page){
        const sectionId = page.locator('#form-elements');

        this.customDDWrapper = sectionId.getByTestId('form-elements-dropdown-custom');
        this.customDDButton = this.customDDWrapper.getByRole('button');
        this.customDDSelectedValue = this.customDDWrapper.getByTestId('form-elements-dropdown-custom-label');
    }

    async selectCustomDropDownOption(text: string){
        await this.customDDButton.click();
        await this.customDDWrapper.getByRole('option', {name: text}).click();
    }

    async assertCustomDropDownSelection(text: string){
        await expect(this.customDDSelectedValue).toHaveText(text);
    }
}
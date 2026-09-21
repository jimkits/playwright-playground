import { expect, Locator, Page } from "@playwright/test";

export class DropDownPage{
    private readonly customDDWrapper: Locator;
    private readonly customDDButton: Locator;
    private readonly customDDSelectedValue: Locator;

    private readonly searchableDDTextField: Locator;
    private readonly searchableDDOptions: Locator;

    constructor(page: Page){
        const sectionId = page.locator('#form-elements');

        this.customDDWrapper = sectionId.getByTestId('form-elements-dropdown-custom');
        this.customDDButton = this.customDDWrapper.getByRole('button');
        this.customDDSelectedValue = this.customDDWrapper.getByTestId('form-elements-dropdown-custom-label');

        this.searchableDDTextField = sectionId.getByTestId('form-elements-dropdown-searchable-input');
        this.searchableDDOptions = sectionId.getByTestId('form-elements-dropdown-searchable-menu');
    }

    async selectCustomDropDownOption(text: string){
        await this.customDDButton.click();
        await this.customDDWrapper.getByRole('option', {name: text}).click();
    }

    async assertCustomDropDownSelection(text: string){
        await expect(this.customDDSelectedValue).toHaveText(text);
    }

    async typeInSearchableDropdown(text: string){
        await this.searchableDDTextField.pressSequentially(text);
    }

    async selectOptionInSearchableDropdown(text: string){
        await this.searchableDDOptions.getByRole('option', {name: text}).click();
    }

    async assertSelectedOptionInSearchableDropdown(text: string){
        await expect(this.searchableDDTextField).toHaveValue(text);
    }
}
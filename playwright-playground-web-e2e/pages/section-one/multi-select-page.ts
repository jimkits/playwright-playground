import { expect, Locator, Page } from "@playwright/test";

export class MultiSelectPage{
    private readonly multiSelect: Locator;

    constructor(page: Page){
        this.multiSelect = page.getByTestId('form-elements-multiselect-frameworks');
    }

    async selectOptions(options: string[]){
        await this.multiSelect.selectOption(options);
    }

    async assertSelections(options: string[]){
        await expect(this.multiSelect).toHaveValues(options);
    }

    async assertSelectionsAreNotSelected(options: string[]){
        await expect(this.multiSelect).not.toHaveValues(options);
    }
}
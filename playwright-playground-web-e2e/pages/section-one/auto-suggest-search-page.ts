import { expect, Locator, Page } from "@playwright/test";

export class AutoSuggestSearchPage{
    private readonly search: Locator;
    private readonly suggestions: Locator;

    constructor(page: Page){
        this.search = page.getByPlaceholder('Search topics...');
        this.suggestions = page.getByTestId('form-elements-autosuggest-results').getByRole('option');
    }

    async searchForText(text: string){
        await this.search.pressSequentially(text);
    }

    async clickOnSuggestion(text: string){
        await this.suggestions.getByText(text).click();
    }

    async assertSuggestions(expected: string[]){
        await expect(this.suggestions).toHaveCount(expected.length);

        for (var i = 0; i < expected.length; i++){
            await expect(this.suggestions.getByText(expected[i])).toBeVisible();
        }
    }

    async assertTextfieldHasValue(text: string){
        await expect(this.search).toHaveValue(text);
    }
}
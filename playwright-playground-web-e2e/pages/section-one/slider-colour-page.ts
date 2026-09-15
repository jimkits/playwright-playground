import { expect, Locator, Page } from "@playwright/test";

export class SliderAndColourPage{
    private readonly page: Page;
    private readonly volume: Locator;
    private readonly priceRangeMin: Locator;
    private readonly priceRangeMax: Locator;
    private readonly priceValue: Locator;
    private readonly favouriteColour: Locator;

    constructor(page: Page){
        this.page = page;
        const sectionId = page.locator('#form-elements');

        this.volume = sectionId.getByRole('slider', {name:'Volume'});
        this.priceRangeMin = sectionId.getByTestId('form-elements-slider-price-min');
        this.priceRangeMax = sectionId.getByTestId('form-elements-slider-price-max');
        this.priceValue = sectionId.getByTestId('form-elements-slider-price-value');
        this.favouriteColour = sectionId.getByTestId('form-elements-input-color');
    }

    async setVolume(value: number){
        await this.volume.fill(`${value}`);
    }

    async assertVolumeValue(expected: number){
        await expect(this.volume).toHaveValue(`${expected}`);
    }

    async setPriceRange(min: number, max: number){
        await this.priceRangeMin.fill(`${min}`);
        await this.priceRangeMax.fill(`${max}`);
    }

    async assertPriceRange(min: number, max: number){
        await expect(this.priceValue).toHaveText(`£${min} - £${max}`);
    }

    async setColor(hex: string){
        hex.includes('#')
        ? await this.favouriteColour.fill(hex)
        : await this.favouriteColour.fill(`#${hex}`);
    }

    async assertColor(hex: string){
        hex.includes('#')
        ? await expect(this.favouriteColour).toHaveValue(hex)
        : await expect(this.favouriteColour).toHaveValue(`#${hex}`);
    }
};
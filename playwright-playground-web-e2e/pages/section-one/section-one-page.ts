import { Page } from "@playwright/test";
import { RegistrationPage } from "./registration-page";
import { SliderAndColourPage } from "./slider-colour-page";
import { FileUploadPage } from "./file-upload-page";
import { AutoSuggestSearchPage } from "./auto-suggest-search-page";
import { MultiSelectPage } from "./multi-select-page";
import { DropDownPage } from "./dropdown-page";

export class SectionOnePage{
    public readonly registration: RegistrationPage;
    public readonly sliderAndColour: SliderAndColourPage;
    public readonly fileUpload: FileUploadPage;
    public readonly search: AutoSuggestSearchPage;
    public readonly multiSelect: MultiSelectPage;
    public readonly dropdown: DropDownPage;

    constructor(page: Page){
        this.registration = new RegistrationPage(page);
        this.sliderAndColour = new SliderAndColourPage(page);
        this.fileUpload = new FileUploadPage(page);
        this.search = new AutoSuggestSearchPage(page);
        this.multiSelect = new MultiSelectPage(page);
        this.dropdown = new DropDownPage(page);
    }
}
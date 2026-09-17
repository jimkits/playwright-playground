import { Page } from "@playwright/test";
import { RegistrationPage } from "./registration-page";
import { SliderAndColourPage } from "./slider-colour-page";
import { FileUploadPage } from "./file-upload-page";
import { AutoSuggestSearch } from "./auto-suggest-search";
import { MultiSelect } from "./multi-select";

export class SectionOne{
    public readonly registration: RegistrationPage;
    public readonly sliderAndColour: SliderAndColourPage;
    public readonly fileUpload: FileUploadPage;
    public readonly search: AutoSuggestSearch;
    public readonly multiSelect: MultiSelect;

    constructor(page: Page){
        this.registration = new RegistrationPage(page);
        this.sliderAndColour = new SliderAndColourPage(page);
        this.fileUpload = new FileUploadPage(page);
        this.search = new AutoSuggestSearch(page);
        this.multiSelect = new MultiSelect(page);
    }
}
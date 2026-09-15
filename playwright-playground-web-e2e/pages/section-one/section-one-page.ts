import { Page } from "@playwright/test";
import { RegistrationPage } from "./registration-page";
import { SliderAndColourPage } from "./slider-colour-page";
import { FileUploadPage } from "./file-upload-page";

export class SectionOne{
    public readonly registration: RegistrationPage;
    public readonly sliderAndColour: SliderAndColourPage;
    public readonly fileUpload: FileUploadPage;

    constructor(page: Page){
        this.registration = new RegistrationPage(page);
        this.sliderAndColour = new SliderAndColourPage(page);
        this.fileUpload = new FileUploadPage(page);
    }
}
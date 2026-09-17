import { Page, Locator, expect } from "@playwright/test";
import { getTestDataFolder } from "../../utils/folders";
import path from "path";

export class FileUploadPage{
    private readonly fileUpload: Locator;
    private readonly uploadProgressBar: Locator;
    private readonly successfulUploadedFileName: Locator;

    constructor(page: Page){
        const sectionId = page.locator('#form-elements');

        this.fileUpload = sectionId.getByTestId('form-elements-upload-input');
        this.uploadProgressBar = sectionId.getByTestId('form-elements-upload-progress');
        this.successfulUploadedFileName = sectionId.getByTestId('form-elements-upload-filename');
    }

    async selectFileToUpload(fullFilePath: string){
        const fullPath = path.join(getTestDataFolder(), fullFilePath);

        console.log(fullPath);

        await this.fileUpload.setInputFiles(fullPath);
    }

    async waitForUploadBarToFill(){
        await this.uploadProgressBar.waitFor()
        await expect(this.uploadProgressBar).toHaveAttribute('style', 'width: 100%;');
    }

    async assertCorrectFileUploaded(fileName: string){
        await expect(this.successfulUploadedFileName).toHaveText(`Uploaded: ${fileName}`);
    }
}
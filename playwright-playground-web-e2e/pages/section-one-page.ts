import { expect, Locator, Page } from "@playwright/test";
import { GetDateYearsAgo } from "../utils/date";

export class SectionOne{
    private readonly page: Page;
    private readonly fullName: Locator;
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly phone: Locator;
    private readonly dob: Locator;
    private readonly country: Locator;
    private readonly gender: Locator;
    private readonly skills: Locator;
    private readonly bio: Locator;
    private readonly submit: Locator;
    private readonly reset: Locator;
    private readonly submitResult: Locator;

    constructor(page: Page){
        this.page = page;
        this.fullName = page.getByTestId('form-elements-input-fullname');
        this.email = page.getByTestId('form-elements-input-email');
        this.password = page.getByTestId('form-elements-input-password');
        this.phone = page.getByTestId('form-elements-input-phone');
        this.dob = page.getByTestId('form-elements-input-dob');
        this.country = page.getByTestId('form-elements-select-country');
        this.gender = page.getByTestId('form-elements-radio-gender-group');
        this.skills = page.getByTestId('form-elements-checkbox-skills-group');
        this.bio = page.getByTestId('form-elements-textarea-bio');
        this.submit = page.getByTestId('form-elements-submit-btn');
        this.reset = page.getByTestId('form-elements-reset-btn');
        this.submitResult = page.getByTestId('form-elements-submit-result');
    }

    async setFullName(text:string){
        await this.fullName.fill(text);
    }

    async assertFullName(text:string){
        await expect(this.fullName).toHaveText(text);
    }

    async setEmail(text:string){
        await this.email.fill(text);
    }

    async assertEmail(text:string){
        await expect(this.email).toHaveText(text);
    }

    async setPassword(text:string){
        await this.password.fill(text);
    }

    async assertPassword(text:string){
        await expect(this.password).toHaveText(text);
    }

    async setPhone(text:string){
        await this.phone.fill(text);
    }

    async assertPhone(text:string){
        await expect(this.phone).toHaveText(text);
    }

    async setDateOfBirth(text:string){
        await this.dob.fill(text);
    }

    async assertDateOfBirth(text:string){
        await expect(this.dob).toHaveText(text)
    }

    async selectCountry(text:string){
        await this.country.selectOption(text);
    }

    async assertCountry(text:string){
        await expect(this.country).toHaveValue(text);
    }

    async selectGender(text:string){
        await this.gender.getByRole('radio', {name: text}).first().check();
    }

    async assertGenderToHaveNoSelection(){
        const genderList = await this.gender.getByRole('radio').all()

        for(const gen of genderList){
            await expect(gen).not.toBeChecked();
        }
    }

    async selectSkills(text:Array<string>){
        for (const t of text){
            await this.skills.getByLabel(t).first().click();
        };
    }

    async assertSkillsToBeUnselected(){
        const skillList = await this.skills.getByRole('checkbox').all()

        for (const s of skillList){
            await expect(s).not.toBeChecked();
        };
    }

    async setBio(text:string){
        await this.bio.fill(text);
    }

    async assertBio(text:string){
        await expect(this.bio).toHaveText(text);
    }

    async submitForm(){
        await this.submit.click();
    }

    async resetForm(){
        await this.reset.click();
    }

    async formSubmittedSuccessfully(){
        await expect(this.submitResult).toBeVisible();
        await expect(this.submitResult).toContainText('successfully');
    }

    async fillInFormWithCorrectValues(){
        await this.setFullName('John Smith');
        await this.setEmail('john.smith@test.com');
        await this.setPassword('password123');
        await this.setPhone('0712345678');
        await this.setDateOfBirth(GetDateYearsAgo(30));
        await this.selectCountry('United Kingdom');
        await this.selectGender('Male');
        await this.selectSkills(['TypeScript','CI/CD']);
        await this.setBio('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    }

    async assertFormHasIsClean(){
        await this.assertFullName('');
        await this.assertEmail('');
        await this.assertPassword('');
        await this.assertPhone('');
        await this.assertDateOfBirth('');
        await this.assertCountry('');
        await this.assertGenderToHaveNoSelection();
        await this.assertSkillsToBeUnselected();
        await this.assertBio('');
    }
}
import { expect, Locator, Page } from "@playwright/test";
import { GetDateYearsAgo } from "../../utils/date";
import { SectionOneData } from "../../test-data/test-data";

export class RegistrationPage{
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
        const sectionId = page.locator('#form-elements');

        this.fullName = sectionId.getByRole('textbox', {name: 'Full Name'});
        this.email = sectionId.getByRole('textbox', {name: 'Email'});
        this.password = sectionId.getByRole('textbox', {name: 'Password'});
        this.phone = sectionId.getByRole('textbox', {name: 'Phone'});
        this.dob = sectionId.getByRole('textbox', {name: 'Date of Birth'});
        this.country = sectionId.getByRole('combobox', {name: 'Country'});
        // the browser object implementation does not wrap the options in a radio list
        this.gender = sectionId.getByTestId('form-elements-radio-gender-group');
        // the browser object implementation does not wrap the options in a checkbox list
        this.skills = sectionId.getByTestId('form-elements-checkbox-skills-group');
        this.bio = sectionId.getByRole('textbox', {name:'Bio'});
        this.submit = sectionId.getByRole('button', {name: 'Submit'});
        this.reset = sectionId.getByRole('button', {name:'Reset'});
        this.submitResult = page.getByTestId('form-elements-submit-result');
    }

    async setFullName(text:string){
        await this.fullName.fill(text);
    }

    async assertFullName(text:string){
        await expect(this.fullName).toHaveValue(text);
    }

    async setEmail(text:string){
        await this.email.fill(text);
    }

    async assertEmail(text:string){
        await expect(this.email).toHaveValue(text);
    }

    async setPassword(text:string){
        await this.password.fill(text);
    }

    async assertPassword(text:string){
        await expect(this.password).toHaveValue(text);
    }

    async setPhone(text:string){
        await this.phone.fill(text);
    }

    async assertPhone(text:string){
        await expect(this.phone).toHaveValue(text);
    }

    async setDateOfBirth(text:string){
        await this.dob.fill(text);
    }

    async assertDateOfBirth(text:string){
        await expect(this.dob).toHaveValue(text)
    }

    async selectCountry(text:string){
        await this.country.selectOption(text);
    }

    async assertCountry(text:string){
        await expect(this.country).toHaveValue(text);
    }

    async selectGender(text:string){
        await this.gender.getByRole('radio', {name: text, exact: true}).check();
    }

    async assertGender(option: string){
        const genderList = await this.gender.getByRole('radio').all()

        for(const gen of genderList){
            if (option != '' && await gen.inputValue() === option)
                await expect(gen).toBeChecked() 
            else
                await expect(gen).not.toBeChecked();
        }
    }

    async selectSkills(text:Array<string>){
        for (const t of text){
            await this.skills.getByLabel(t, {exact: true}).check();
        };
    }

    async assertSkills(options: string[]){
        const skillList = await this.skills.getByRole('checkbox').all()

        for (const s of skillList){
            if (options.includes(await s.inputValue()))
                await expect(s).toBeChecked();
            else
                await expect(s).not.toBeChecked();
        };
    }

    async setBio(text:string){
        await this.bio.fill(text);
    }

    async assertBio(text:string){
        await expect(this.bio).toHaveValue(text);
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

    async fillInFormWithCorrectValues(data: typeof SectionOneData){
        await this.setFullName(data.fullName);
        await this.setEmail(data.email);
        await this.setPassword(data.password);
        await this.setPhone(data.phone);
        await this.setDateOfBirth(GetDateYearsAgo(30));
        await this.selectCountry(data.country);
        await this.selectGender(data.gender);
        await this.selectSkills(data.skills);
        await this.setBio(data.bio);
    }

    async assertFormValuesAreCorrect(data: typeof SectionOneData){
        await this.assertFullName(data.fullName);
        await this.assertEmail(data.email);
        await this.assertPassword(data.password);
        await this.assertPhone(data.phone);
        await this.assertDateOfBirth(GetDateYearsAgo(30));
        await this.assertCountry(data.country);
        await this.assertGender(data.gender);
        await this.assertSkills(data.skills);
        await this.assertBio(data.bio);
    }

    async assertFormHasIsClean(){
        await this.assertFullName('');
        await this.assertEmail('');
        await this.assertPassword('');
        await this.assertPhone('');
        await this.assertDateOfBirth('');
        await this.assertCountry('');
        await this.assertGender('');
        await this.assertSkills([]);
        await this.assertBio('');
    }
}
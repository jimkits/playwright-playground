import { test } from './fixtures';
import { SectionOneData } from '../test-data/test-data';

test.describe('Fill in Section 1', {
    tag: ['@local','@production']
}, () =>{
    test('Fill in and submit registration form', async ({navigation, sectionOne}) => {
        // Act
        await navigation.goToSectionOne();

        await sectionOne.fillInFormWithCorrectValues(SectionOneData);
 
        await sectionOne.submitForm();

        // Assert
        await sectionOne.formSubmittedSuccessfully();

        await sectionOne.assertFormValuesAreCorrect(SectionOneData);
    });

    test('Fill in and reset registration form', async ({navigation,sectionOne}) => {
        // Act
        await navigation.goToSectionOne();

        await sectionOne.fillInFormWithCorrectValues(SectionOneData);
 
        await sectionOne.resetForm();

        // Assert
        await sectionOne.assertFormHasIsClean();
    });
});
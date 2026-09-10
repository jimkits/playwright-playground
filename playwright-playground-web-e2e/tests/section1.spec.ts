import { test } from './fixtures';

test.describe('Fill in Section 1', {
    tag: ['@local','@production']
}, () =>{
    test('Fill in and submit registration form', async ({navigation, sectionOne}) => {
        // Act
        await navigation.goToSectionOne();

        await sectionOne.fillInFormWithCorrectValues();
 
        await sectionOne.submitForm();

        // Assert
        await sectionOne.formSubmittedSuccessfully();
    });

    test('Fill in and reset registration form', async ({navigation,sectionOne}) => {
        // Act
        await navigation.goToSectionOne();

        await sectionOne.fillInFormWithCorrectValues();
 
        await sectionOne.resetForm();

        // Assert
        await sectionOne.assertFormHasIsClean();
    });
});
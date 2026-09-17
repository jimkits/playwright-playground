import { test } from './fixtures';
import { SectionOneData } from '../test-data/test-data';

test.describe('Section 1 - registration form', {
    tag: ['@local','@production', '@sectionone']
}, () => {
    test('Fill registration form and submit', async ({navigation, sectionOne}) => {
        // Arrange
        const registration = sectionOne.registration;

        // Act
        await navigation.goToSectionOne();

        await registration.fillInFormWithCorrectValues(SectionOneData);
 
        await registration.submitForm();

        // Assert
        await registration.formSubmittedSuccessfully();

        await registration.assertFormValuesAreCorrect(SectionOneData);
    });

    test('Fill registration form and reset', async ({navigation,sectionOne}) => {
        // Arrange
        const registration = sectionOne.registration;

        // Act
        await navigation.goToSectionOne();

        await registration.fillInFormWithCorrectValues(SectionOneData);
 
        await registration.resetForm();

        // Assert
        await registration.assertFormHasIsClean();
    });
});

test.describe('Section 1 - sliders and colour', {
    tag: ['@local', '@production', '@sectionone']
}, () => {
    test('Fill sliders and colour', async ({navigation, sectionOne}) => {
        // Arrange
        const sliderColour = sectionOne.sliderAndColour;

        // Act
        await navigation.goToSectionOne();

        await sliderColour.setVolume(30);
        await sliderColour.setPriceRange(10, 40);
        await sliderColour.setColor('#6366f1');
        
        // Assert
        await sliderColour.assertVolumeValue(30);
        await sliderColour.assertPriceRange(10,40);
        await sliderColour.assertColor('6366f1');
    });
});

test.describe('Section 1 - file upload', {
    tag: ['@local', '@production', '@sectionone']
}, () => {
    test('Select file to upload', async ({navigation, sectionOne}) => {
        // Arrange
        const fileUpload = sectionOne.fileUpload;
        const fileName = 'Dimitrios Bitsanis CV.pdf';

        // Act
        await navigation.goToSectionOne();

        await fileUpload.selectFileToUpload(fileName);

        // Assert
        await fileUpload.waitForUploadBarToFill();
        await fileUpload.assertCorrectFileUploaded(fileName);
    });
});

test.describe('Section 1 - auto suggested search', {
    tag: ['@local','@production','@sectionone']
}, () => {
    test('Search part of text and expect correct suggestions', async ({navigation, sectionOne}) => {
        // Arrange
        const search = sectionOne.search;

        // Act
        await navigation.goToSectionOne();

        await search.searchForText('te');

        // Assert
        await search.assertSuggestions(['Locator strategies','Network interception','Component testing']);
    });

    test('Search text that gives no suggestion', async ({navigation, sectionOne}) => {
        // Arrange
        const search = sectionOne.search;

        // Act
        await navigation.goToSectionOne();

        await search.searchForText('There should be no text like this');

        // Assert
        await search.assertSuggestions([]);
    });
});
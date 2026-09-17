import { test } from './fixtures';
import { SectionOneData } from '../test-data/test-data';
import { SectionOnePage } from '../pages/section-one/section-one-page';

test.beforeEach(async ({navigation}) => {
        await navigation.goToSectionOne();
});

test.describe('Section 1 - registration form', {
    tag: ['@local','@production', '@sectionone']
}, () => {
    test('Fill registration form and submit', async ({sectionOne}) => {
        // Arrange
        const registration = sectionOne.registration;

        // Act
        await registration.fillInFormWithCorrectValues(SectionOneData);
 
        await registration.submitForm();

        // Assert
        await registration.formSubmittedSuccessfully();

        await registration.assertFormValuesAreCorrect(SectionOneData);
    });

    test('Fill registration form and reset', async ({sectionOne}) => {
        // Arrange
        const registration = sectionOne.registration;

        // Act
        await registration.fillInFormWithCorrectValues(SectionOneData);
 
        await registration.resetForm();

        // Assert
        await registration.assertFormHasIsClean();
    });
});

test.describe('Section 1 - sliders and colour', {
    tag: ['@local', '@production', '@sectionone']
}, () => {
    test('Fill sliders and colour', async ({sectionOne}) => {
        // Arrange
        const sliderColour = sectionOne.sliderAndColour;

        // Act
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
    test('Select file to upload', async ({sectionOne}) => {
        // Arrange
        const fileUpload = sectionOne.fileUpload;
        const fileName = 'Dimitrios Bitsanis CV.pdf';

        // Act
        await fileUpload.selectFileToUpload(fileName);

        // Assert
        await fileUpload.waitForUploadBarToFill();
        await fileUpload.assertCorrectFileUploaded(fileName);
    });
});

test.describe('Section 1 - auto suggested search', {
    tag: ['@local','@production','@sectionone']
}, () => {
    test('Search part of text and expect correct suggestions then click on one', async ({sectionOne}) => {
        // Arrange
        const search = sectionOne.search;
        const searchText = 'te';
        const selections = ['Component testing','Locator strategies','Network interception'];

        // Act
        await search.searchForText(searchText);
        await search.assertSuggestions(selections);
        await search.clickOnSuggestion(selections[0]);

        // Assert
        await search.assertTextfieldHasValue(selections[0]);
    });

    test('Search text that gives no suggestion', async ({sectionOne}) => {
        // Arrange
        const search = sectionOne.search;

        // Act
        await search.searchForText('There should be no text like this');

        // Assert
        await search.assertSuggestions([]);
    });
});

test.describe('Section 1 - Multi select textfield', {
    tag: ['@local','@production','@sectionone'],
}, () => {
    test('Select multiple values from the field', async ({sectionOne}) => {
        // Arrange
        const multiSelect = sectionOne.multiSelect;
        const expectedOptions = ['Playwright','Selenium'];
        const unselectedOptions = ['Cypress'];

        // Act
        await multiSelect.selectOptions(expectedOptions);

        // Assert
        await multiSelect.assertSelections(expectedOptions);
        await multiSelect.assertSelectionsAreNotSelected(unselectedOptions);
    })
});

test.describe('Section 1 - Dropdown fields', {
    tag:['@local','@production','@sectionone'],
}, () => {
    test('Select custom dropdown value', async ({sectionOne}) => {
        // Arrange
        const dropdown = sectionOne.dropdown;
        const selection = 'Playwright';

        // Act
        await dropdown.selectCustomDropDownOption(selection);

        // Assert
        await dropdown.assertCustomDropDownSelection(selection);
    });
});
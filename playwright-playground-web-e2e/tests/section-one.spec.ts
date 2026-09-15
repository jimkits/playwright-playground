import { test } from './fixtures';
import { SectionOneData } from '../test-data/test-data';
import { SliderAndColourPage } from '../pages/section-one/slider-colour-page';

test.describe('Fill section 1 registration form', {
    tag: ['@local','@production']
}, () => {
    test('Fill registration form and submit', async ({navigation, sectionOne}) => {
        // Act
        await navigation.goToSectionOne();

        await sectionOne.registration.fillInFormWithCorrectValues(SectionOneData);
 
        await sectionOne.registration.submitForm();

        // Assert
        await sectionOne.registration.formSubmittedSuccessfully();

        await sectionOne.registration.assertFormValuesAreCorrect(SectionOneData);
    });

    test('Fill registration form and reset', async ({navigation,sectionOne}) => {
        // Act
        await navigation.goToSectionOne();

        await sectionOne.registration.fillInFormWithCorrectValues(SectionOneData);
 
        await sectionOne.registration.resetForm();

        // Assert
        await sectionOne.registration.assertFormHasIsClean();
    });
});

test.describe('Fill section 1 sliders and colour', {
    tag: ['@local', '@production']
}, () => {
    test('Fill sliders and colour', async ({navigation, sectionOne}) => {
        // Act
        await navigation.goToSectionOne();

        await sectionOne.sliderAndColour.setVolume(30);
        await sectionOne.sliderAndColour.setPriceRange(10, 40);
        await sectionOne.sliderAndColour.setColor('#6366f1');
        
        // Assert
        await sectionOne.sliderAndColour.assertVolumeValue(30);
        await sectionOne.sliderAndColour.assertPriceRange(10,40);
        await sectionOne.sliderAndColour.assertColor('6366f1');
    });
});
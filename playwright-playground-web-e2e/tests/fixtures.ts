import {test as base} from '@playwright/test';
import { Heading } from "../pages/heading-page";
import { Navigation } from '../pages/navigation-page';
import { SectionOne } from '../pages/section-one-page';

type PageObjects = {
    heading: Heading;
    navigation: Navigation;
    sectionOne: SectionOne;
};

export const test = base
// This code runs for every test
.extend<{forEachTest: void}>({
    forEachTest: [async ({page}, use) => {
        //This code runs before each test
        await page.goto('');

        await use();

        //This code runs after each test
        await page.close();
    }, {auto: true}] // automatically starts for every test.
})
// Registers page object fixtures so tests can just destructure them instead of instantiating each class manually.
.extend<PageObjects>({
    heading: async ({page}, use) => {
        const heading = new Heading(page);
        await use(heading);
    },
    navigation: async ({page}, use) => {
        const navigation = new Navigation(page);
        await use(navigation);
    },
    sectionOne: async ({page}, use) => {
        const sectionOne = new SectionOne(page);
        await use(sectionOne);
    }
})
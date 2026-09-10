import { test } from "./fixtures";

test('Website loads', async ({heading}) => {
    // Assert
    await heading.headingLoads();
});
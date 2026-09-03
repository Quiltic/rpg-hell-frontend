// Types only (no runtime import). jest-dom ships this augmentation in
// "@testing-library/jest-dom/vitest", but that file resolves jest-dom's own
// nested copy of vitest, so the matchers never reach the vitest we run.
// Declaring it here points the augmentation at the root vitest.
import "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    interface Assertion<T = any> extends TestingLibraryMatchers<any, T> {}
    interface AsymmetricMatchersContaining
        extends TestingLibraryMatchers<any, any> {}
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

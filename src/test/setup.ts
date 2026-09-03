// jest-dom's "/vitest" entry point resolves its own nested copy of vitest, which
// does not match the version this repo uses. Registering the matchers by hand
// avoids that and does the same thing.
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";

expect.extend(matchers);

afterEach(() => {
    cleanup();
});

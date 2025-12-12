/*
FILE          : helper.mjs
AUTHOR        : Kilian Testard
DATE CREATED  : 14.11.2025
LAST MODIFIED : 21.11.2025
DESCRIPTION   :
    Utility module providing helper functions used throughout the application.
    Includes validation logic for common input formats.

REQUIRED LIBRARIES:
    - None (pure utility functions, no external dependencies)

EXPORTED FUNCTIONS:
    - isValidInteger(value)
        Checks whether the given value is a valid positive integer.
        Returns true if:
            • value can be converted to a number
            • value is an integer
            • value is strictly greater than 0
        Otherwise returns false.

NOTES:
    - Used primarily in controllers to validate route parameters (e.g., IDs, limits).
    - Ensures consistent validation logic across all modules.
*/

function isValidInteger(value) {
    return Number.isInteger(Number(value)) && Number(value) > 0;
}

export { isValidInteger };

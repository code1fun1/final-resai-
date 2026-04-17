interface Experience {
  bullet_points?: string[];
  [key: string]: string | string[] | undefined; // Allow other fields of type string or string[]
}
export const getYear = (dateString: string): number | null => {
  const date = new Date(dateString);
  return isNaN(date.getFullYear()) ? null : date.getFullYear();
};
export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length !== 10) {
    return phoneNumber;
  }
  // Extract parts of the phone number
  const countryCode = '+91';
  const areaCode = cleaned.substring(0, 3);
  const part1 = cleaned.substring(3, 5);
  const part2 = cleaned.substring(5, 7);
  const remaining = cleaned.substring(7);
  // Format the phone number
  return `${countryCode}-(${areaCode})-${part1}-${part2} ${remaining}`;
};
//replace None or none from array
export const replaceNoneValues = (obj: Record<string, unknown>): Record<string, unknown> => {
  // Iterate over the object properties
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // Check if the value is a string
      if (typeof value === 'string') {
        // Convert value to lowercase for case-insensitive comparison
        const lowerCaseValue = value.toLowerCase();

        // Replace if the value is exactly "none", "n/a", or contains these patterns (e.g., "None - None")
        if (lowerCaseValue === 'none' || lowerCaseValue === 'n/a') {
          obj[key] = '';
        } else if (lowerCaseValue.includes('none') || lowerCaseValue.includes('n/a')) {
          // If the string contains "none" or "n/a", replace those with empty strings
          obj[key] = lowerCaseValue
            .replace(/none|n\/a/gi, '') // Replace "none" and "n/a"
            .trim()
            .replace(/\s*-\s*/g, ' ') // Replace " - " with a space (you can change this to another character)
            .replace(/\s+/g, ' '); // Ensure no extra spaces are left
        }
      } else if (typeof value === 'object' && value !== null) {
        // Recursively call the function if it's an object (but not null)
        replaceNoneValues(value as Record<string, unknown>);
      } else if (Array.isArray(value)) {
        // If it's an array, iterate over its elements
        obj[key] = value.map((item: unknown) => {
          // Check if the item is a string
          if (typeof item === 'string') {
            const itemValue = item.toLowerCase();
            if (itemValue === 'none' || itemValue === 'n/a') {
              return '';
            } else if (itemValue.includes('none') || itemValue.includes('n/a')) {
              // Replace "none" or "n/a" within the string
              return itemValue
                .replace(/none|n\/a/gi, '') // Replace "none" and "n/a"
                .trim()
                .replace(/\s*-\s*/g, ' ') // Replace " - " with a space (or another character)
                .replace(/\s+/g, ' '); // Ensure no extra spaces are left
            }
          } else if (typeof item === 'object' && item !== null) {
            // Recursively call the function for nested objects
            return replaceNoneValues(item as Record<string, unknown>);
          }
          return item; // Return non-string items unchanged
        });
      }
    }
  }
  return obj;
};

export const areAllFieldsFilled = (arrayData: Experience[]): boolean => {
  // Modify each experience object in the array
  const modifiedArray = arrayData.map((experience) => replaceNoneValues(experience));

  // Check if the modified array is valid
  if (!Array.isArray(modifiedArray) || modifiedArray.length === 0) {
    return false;
  }

  // Function to check if all fields in an object are empty
  const isAllFieldsEmpty = (experience: Experience): boolean => {
    return Object.entries(experience).every(([key, value]) => {
      if (key === 'bullet_points') {
        return Array.isArray(value) && value.every((item) => item === '');
      } else {
        return value === '';
      }
    });
  };

  // Check each experience object in the array
  return modifiedArray.some((experience) => {
    // Check if experience is defined and is an object
    if (!experience || typeof experience !== 'object') {
      return false;
    }
    // Return true if at least one experience has non-empty fields
    return !isAllFieldsEmpty(experience as Experience); // Assert as Experience type
  });
};

//handle 'none', 'n/a','na'
export const isValidValue = (value: string | undefined | null): string | null => {
  const invalidValues = ['none', 'n/a', 'na'];
  return value && !invalidValues.includes(value.toLowerCase()) ? value : null;
};

export const formatPhoneNumberNineOne = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
  if (cleaned.length !== 10) {
    return phoneNumber; // If the number doesn't have 10 digits, return the original input
  }

  const countryCode = '+91';
  // Combine the country code with the cleaned phone number
  return `${countryCode}-${cleaned}`;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * At least 6 characters
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Validate strong password
 * At least 8 characters, one uppercase, one lowercase, one number
 */
export const isStrongPassword = (password: string): boolean => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

/**
 * Validate username
 * 3-20 characters, alphanumeric and underscores only
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * Check if passwords match
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Validate required field
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validate minimum length
 */
export const minLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

/**
 * Validate maximum length
 */
export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

/**
 * Validate number
 */
export const isNumber = (value: string): boolean => {
  return !isNaN(Number(value));
};

/**
 * Validate positive number
 */
export const isPositiveNumber = (value: string | number): boolean => {
  const num = typeof value === 'string' ? Number(value) : value;
  return !isNaN(num) && num > 0;
};

/**
 * Get validation error message
 */
export const getValidationError = (field: string, value: string, rules: string[]): string | null => {
  for (const rule of rules) {
    switch (rule) {
      case 'required':
        if (!isRequired(value)) {
          return `${field} is required`;
        }
        break;
      case 'email':
        if (!isValidEmail(value)) {
          return `${field} must be a valid email`;
        }
        break;
      case 'password':
        if (!isValidPassword(value)) {
          return `${field} must be at least 6 characters`;
        }
        break;
      case 'strongPassword':
        if (!isStrongPassword(value)) {
          return `${field} must be at least 8 characters with uppercase, lowercase, and number`;
        }
        break;
      case 'username':
        if (!isValidUsername(value)) {
          return `${field} must be 3-20 alphanumeric characters`;
        }
        break;
      default:
        break;
    }
  }
  return null;
};




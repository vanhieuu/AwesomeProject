export const formatPhoneNumber = (phoneNumber: any) => {
  // Check if the phone number starts with '0'
  if (phoneNumber.startsWith('0')) {
    // Replace '0' with '+84'
    phoneNumber = '+84' + phoneNumber.slice(1);
  }

  // Extract and format the number parts
  const prefix = phoneNumber.slice(0, 3); // +84
  const firstPart = phoneNumber.slice(3, 6); // 962
  const lastPart = phoneNumber.slice(10); // 61

  // Combine parts with masking
  const formattedNumber = `${prefix} ${firstPart}****${lastPart}`;

  return formattedNumber;
};


export const  isValidVietnamesePhoneNumber =(phoneNumber:any) => {
  // Remove any spaces, dashes, or parentheses from the input
  phoneNumber = phoneNumber.replace(/[\s()-]/g, '');

  // Regular expression for Vietnamese phone numbers with optional international prefix
  const phoneRegex = /^((\+84|84|0)(9|3|7|8|5|2)\d{7,9})$/;

  // Test if the number matches the pattern
  return phoneRegex.test(phoneNumber);
}

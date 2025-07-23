export enum EGender {
    Male = 'পুরুষ',
    Female = 'নারী',
}

export enum EMaritalStatus {
    Single = 'অবিবাহিত',
    Married = 'বিবাহিত',
    Divorced = 'তালাকপ্রাপ্ত',
    Widowed = 'বিধবা',
    Separated = 'আলাদা ',
    Other = 'অজানা',
}

export enum EBloodGroup {
    APositive = 'A+',
    ANegative = 'A-',
    BPositive = 'B+',
    BNegative = 'B-',
    ABPositive = 'AB+',
    ABNegative = 'AB-',
    OPositive = 'O+',
    ONegative = 'O-',
}

export enum EProjectType {
    Fundraising = 'তহবিল সংগ্রহ',
    Volunteer = 'স্বেচ্ছাসেবক',
}

export enum EProjectStatus {
    UPCOMING = 'আসন্ন',
    ACTIVE = 'চলমান',
    COMPLETED = 'সম্পন্ন',
    CANCELLED = 'বাতিল',
    PAUSED = 'বিরতি',
    CLOSED = 'বন্ধ',
}
export enum EMessageStatus {
    READ = 'পড়া হয়েছে',
    UNREAD = 'অপঠিত',
}
export enum EDonationStatus {
    PENDING = 'অপেক্ষমাণ',
    APPROVED = 'অনুমোদিত',
    REJECTED = 'প্রত্যাখ্যাত',
}

export enum EPaymentMethod {
    bKash = 'bkash',
    Nagad = 'nagad',
    Rocket = 'rocket',
    Upay = 'upay',
    Card = 'card',
    SSl = 'ssl',
    Others = 'others',
}

export enum EAccountTransactionType {
    Income = 'আয়',
    Expense = 'ব্যায়',
}

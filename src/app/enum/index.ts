export enum EGender {
    Male = 'male',
    Female = 'female',
}

export enum EMaritalStatus {
    Single = 'single',
    Married = 'married',
    Divorced = 'divorced',
    Widowed = 'widowed',
    Separated = 'separated',
    Other = 'other',
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
    Fundraising = 'fundraising',
    Volunteer = 'volunteer',
}

export enum EProjectStatus {
    UPCOMING = 'upcoming',
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    PAUSED = 'paused',
    DRAFT = 'draft',
    CLOSED = 'closed',
    ARCHIVED = 'archived',
}
export enum EMessageStatus {
    READ = 'read',
    UNREAD = 'unread',
}
export enum EDonationStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export enum EPaymentMethod {
    bKash = 'bkash',
    Nagad = 'nagad',
    Rocket = 'rocket',
    Upay = 'upay',
    Card = 'card',
    Others = 'others',
}

export enum EAccountTransactionType {
    Income = 'income',
    Expense = 'expense',
}

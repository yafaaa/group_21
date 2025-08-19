export interface CategoryRequest {
  tans?: Translation[];
}
export interface Restaurantupdto {
  name: string;
  description?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  bkid:number;
}

export interface  BusinessKind {
  id: number;
  name: string;
}

export interface RestaurantDto {
  name: string;
  description?: string;
}
export interface FoodRequest {  
  translations?: Translation[];
  exch:Exchange[];
  // price?: number;
}
export interface RegistrationRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  restaurantName: string;
  businessKindId:number;
}
export interface AdminUserRequest{

}
export interface  ForgotPasswordRequest{
   email: string;
}
export interface VerifyResetOtpRequest{
  email: string;
  otp: string;
}
export interface ResetPasswordRequest{
  newPassword: string;
  token: string;
}
export interface LoginRequest{
  email:string;
  password:string;

}
export interface UserProfile{
    name: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    verified: boolean;
    restaurantName?: string;
}
export type UserRole = 'ADMIN' | 'RESTAURANT_OWNER'; // Add any other roles you have

export interface UserDTO {
  id: number;
  name: string;
  phoneNumber: string;
  referralCode: string;
  verified: boolean;
  role: UserRole;
}
export interface ChangePasswordRequest{
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
// Assuming DiscountRequest looks like this:


//this is the complax food manu object stractue
export interface Menuin {
  id: number;
  baseCategories: Category[]; // Replace with your actual item type
  supportedLanguages : Language[];
  supportedCurrency : Currency[];
}
export interface MenuTemplate{
  name:String;
  description: String;
  baseCategories: Category[]; 
}
export interface Category {
  id: number;
  translations: Translation[];
}
export interface Language {
  id: number;
  code: string;
  name: string;
}
export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
}
export interface LanguageCreateDTO {
  code: string;
  name: string;
}
export interface CurrencyCreateDTO { 
  code: string;
  name: string;
  symbol: string;
}
export interface SubdomainResponse{
  claimed: boolean;
  canbeclaimed: boolean; 
}
export interface Translation {
  languageCode: string;  // corresponds to "language" in frontend interface
  fieldName: string;     // corresponds to "name" in frontend interface
  translatedText: string;  // stores the actual translation text
}
export interface Exchange {
  symbol: string;  // corresponds to "language" in frontend interface
  price: number;     // corresponds to "name" in frontend interface
}
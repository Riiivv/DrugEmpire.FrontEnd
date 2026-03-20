export interface AddressRequest {
  addressId: number;
  userId: number;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export interface AddressResponse {
  addressId: number;
  userId: number;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}
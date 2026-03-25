export interface UserRequest{
userId: number;
username: string;
email: string;
firstName: string;
lastName: string;
phoneNumber: string;
password: string;
}

export interface UserResponse{
userId: number;
username: string;
email: string;
firstName: string;
lastName: string;
phoneNumber: string;
role: string;
}
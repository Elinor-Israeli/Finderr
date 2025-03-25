export type Credentials = {
    username: string
    password: string
    fullname: string
}

export type LoginUser  = {
    _id: string
    username?: string
}

export interface User {
    _id: string;
    fullname: string;
    imgUrl: string;
    level: number;
    rate: number;
    reviews: any[]; 
  }

  export interface Owner {
    _id: string;
    fullname: string;
    imgUrl: string;
    level?: string;
    rate?: number;
    reviews?: any[]; // Or a more specific type for reviews
  }
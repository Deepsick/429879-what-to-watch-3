export interface CommentPost {
  rating: number,
  comment: string,
}

export interface CommentGet {
  id: number,
  user: CommentUser,
  rating: number,
  comment: string,
  date: string,
}

export interface CommentUser {
  id: number,
  name: string,
}

export interface Movie {
  id: number,
  name: string,
  poster: string,
  preview: string,
  cover: string,
  bgColor: string,
  video: string,
  trailer: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  duration: number,
  genre: string,
  year: number,
  isFavorite: boolean,
}

export interface User {
  email: string,
  password: string,
}

export interface AuthInfo {
  id: number,
  email: string,
  name: string,
  avatar_url: string,
}
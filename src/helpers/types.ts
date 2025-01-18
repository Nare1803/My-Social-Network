export interface IUser {
    id: string
    name: string
    surname: string
    login: string
    password: string
    cover: string
    picture: string
    followers: IUser[]
    following: IUser[]
    posts:IPost[]
}

export interface IAccount extends IUser {
    isPrivate: boolean
    connection: {
        followsMe: boolean
        following: boolean
        requested: boolean
    }
}

export interface IResponse {
    status: string
    message: string
    payload: unknown
    user?: IUser
}
export type IAuth = Pick<IUser, 'login' | 'password'>

export interface IContext {
    user: null | IUser
    refetch: () => void
}

export interface IAccountContext{
    account:IAccount
    refetch: () => void
}   

export interface IUpdatePassword{
    old: string
    newpwd: string
}
export interface IUpdateLogin{
    password: string
    login: string
}

export interface IStatus {
    status:string
}

export interface IPost {
    id: number;
    picture: string;
    content?:string
    title:string;
    // userId:string
    didILike?:boolean
    refetch : () => void
    likes: number[];
}
export interface IAddPost {
    photo: File | string;
    content: string;
  }

import type {Session, User} from 'next-auth'
import type {JWT} from 'nextaut/jwt'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    id : UserId,
  }
}

declare module 'next-auth' {
  interface Session {
    user : User & {
      id : UserId
    }
  }
}
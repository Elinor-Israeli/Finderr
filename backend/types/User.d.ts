import type { ObjectId } from 'mongodb'

type LoggedInUser = {
    _id: ObjectId
    fullname: string
}
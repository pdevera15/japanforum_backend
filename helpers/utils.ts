import { ObjectId } from "mongodb"

/**
 * Id to MongoDB ObjectID converter
 * @param id: string
 * @return ObjectId: ObjectId
 */
export const toObjectId = (id: string) => new ObjectId(id)

export const getId = (id: ObjectId) => new ObjectId(id).toString()

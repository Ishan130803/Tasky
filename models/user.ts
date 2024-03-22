import mongoose, {Schema, models} from 'mongoose'
import { taskObj } from '@/types/taskClass'

const userSchema = new Schema (
  {
    email : {
      type : String,
      required : true,
    },
    name : {
      type : String,
      required : true,
    },
    id : {
      type : String,
      required : true,
    },
    providerId : {
      type : String,
      required : true,
    }
  }
)

const User = models.User || mongoose.model('User', userSchema)
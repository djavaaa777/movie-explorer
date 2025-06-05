import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  favorites:typeMovie[]
}

type typeMovie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
};

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      release_date: { type: String, required: true },
      poster_path: { type: String, required: true },
      overview: { type: String, required: true },
      _id: false
    }
  ]
});


const User = mongoose.model<IUser>('User', UserSchema);
export default User;

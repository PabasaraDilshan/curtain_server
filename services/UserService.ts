import User from "../models/User";



export async function Login(username:string){
    const user = await User.findOne({ username: username });
    if(!user){
        const user = new User({username:username});
        await user.save();
        return user;
    }
    return user;
}
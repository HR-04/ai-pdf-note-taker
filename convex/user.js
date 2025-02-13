
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
   args:{
        userName : v.string(),
        email: v.string(),
        imageUrl : v.string()
    },
    handler:async(ctx,args)=>{
        // if user already exist
        const user = await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email'),args.email))
        .collect();
        // if not, then insert new user entry
        if(user?.length==0)
        {
            await ctx.db.insert('users',{
                email:args.email,
                userName:args.userName,
                imageUrl:args.imageUrl
            }); 

            return 'Inserted New User...'
        }

        return 'User Already Exist'
    }
})
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    

    const idToAdd = await fetchRedis('get',`user:email:${emailToAdd}`) as string

    if(!idToAdd){
        return new Response('User does not exist.', {status: 400})
    }

    const session = await getServerSession(authOptions)

    if(!session){
        return new Response('Unauthorized',{status: 401})
    }

    if(idToAdd === session.user.id){
        return new Response('You cannot add yourself as a friend.',{status: 400})
    }

    // check if user is already added
    const isUserAlreadyAdded = await fetchRedis('sismember', `user:${idToAdd}:friends`,session.user.id) as 0 | 1 

    if(isUserAlreadyAdded){
        return new Response('Already added this user', {status: 400})
    }
    // check if user is already added as friend
    const isUserAlreadyFriend = await fetchRedis('sismember', `user:${session.user.id}:incoming_friend_requests`,idToAdd) as 0 | 1 

    if(isUserAlreadyFriend){
        return new Response('Already friend with this user', {status: 400})
    }

    // valid request , send friend request

    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)

    return new Response('Ok')
  } catch (error) {
    if(error instanceof z.ZodError){
        return new Response('Invalid request payload',{status : 422})
    }

    return new Response('Invalid request', {status: 400})
  }
}

import {Redis} from '@upstash/redis';
import 'dotenv/config';
// initialzed redis client
export const redis = new Redis({
    url : process.env.UPSTASH_REDIS_REST_URL ,
    token : process.env.UPSTASH_REDIS_REST_TOKEN,
});

// helper function sessionmanage karne ke kiye 

export const redisSession ={

    //redis session set

    async setSession (sessionId : string , userData : {userId : string , email : string} ){
        const key = `session:${sessionId}`;
        const value = JSON.stringify(userData);

        await redis.set(key , value ,{ ex: 7 * 24 * 60 * 60 } )
    } ,

    //redis get session

    async getSession (sessionId : string){

        const key = (`session:${sessionId}`)
        const data = await redis.get<string>(key);


        if (!data) return null;

       

        return  typeof data ==="string" ? JSON.parse(data) : data
        



        

    },

    async delSession(sessionId : string) {

        const key = `session:${sessionId}`;
         await redis.del(key)

    }

    

};



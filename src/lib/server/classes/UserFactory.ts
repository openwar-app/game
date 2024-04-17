import {User} from "$lib/server/classes/User";
import UserEntity from "$lib/server/database/Entities/User";
import {CachedMap} from "$lib/shared/CachedMap";


export class UserFactory {
    static MapById: CachedMap<string, User> = new CachedMap();
    static MapByName: CachedMap<string, User> = new CachedMap();
    static MapByEmail: CachedMap<string, User> = new CachedMap();

    static addToCache(user: User) {
        this.MapById.put(user.getId(), user);
        this.MapByName.put(user.getCharName(), user);
        this.MapByEmail.put(user.getEmail(), user);
    }

    static async byId(id: string) {
        let cacheUser = this.MapById.get(id);
        if (cacheUser) {
            this.addToCache(cacheUser);
            return cacheUser;
        }
        const findUser = await UserEntity.findOne({
            where: {
                id
            }
        });
        if (findUser) {
            let user = UserFactory.createUserInstance(findUser);
            this.addToCache(user);
            return user;
        }
        return null;
    }

    static async byEmail(email: string) {
        let cacheUser = this.MapByEmail.get(email);
        if (cacheUser) {
            this.addToCache(cacheUser);
            return cacheUser;
        }
        const findUser = await UserEntity.findOne({
            where: {
                email
            }
        });
        if (findUser) {
            let user = UserFactory.createUserInstance(findUser);
            this.addToCache(user);
            return user;
        }
        return null;
    }


    private static createUserInstance(data: UserEntity): User {
        let newObj = Object.create(User.prototype);
        newObj = Object.assign(newObj, {_user: data});
        return newObj;
    }

}
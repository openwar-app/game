import UserEntity from "$lib/server/database/Entities/User";
import emailValidator from "email-validator";
import argon2 from "argon2";
export class User {
    private _user: UserEntity;

    public getId() {
        return this._user.id;
    }

    public getEmail() {
        return this._user.email;
    }

    public getCharName() {
        return this._user.charname;
    }

    private constructor(user: UserEntity) {
        this._user = user;
    }

    static async create(data: Partial<UserEntity>) {
        let user = new UserEntity();
        Object.assign(user, data);
        user.password = await argon2.hash(user.password);
        await user.save();
        return new User(user);
    }

    static async validatePassword(email: string, password: string) {
        const user = await User.byEmail(email);
        if(user) {
            return argon2.verify(user._user.password, password);
        }
        return false;
    }


    static async byId(id: string) {
        const findUser = await UserEntity.findOne({
            where: {
                id
            }
        });
        if(findUser) {
            return new User(findUser);
        }
        return null;
    }
    static async byEmail(email: string) {
        const findUser = await UserEntity.findOne({
            where: {
                email
            }
        });
        if(findUser) {
            return new User(findUser);
        }
        return null;
    }

    static async validateEmail(email: string, failIfExists:boolean=false) : Promise<true|string> {
        const validEmail = emailValidator.validate(email);
        if(!validEmail) {
            return 'website.register.invalid_email';
        }

        if(failIfExists) {
            const findUser = await UserEntity.exists({
                where: {
                    email
                }
            });
            if(findUser) {
                return 'website.register.email_already_exists';
            }
        }
        return true;
    }

    static async validateCharname(charname: string, failIfExists: boolean) {
        charname = charname.trim();
        if(charname.length < 1) {
            return 'website.register.charname_too_short';
        }
        if(charname.length > 16) {
            return 'website.register.charname_too_long';
        }
        if(!charname.match(/^[a-zA-Z0-9 ]+$/)) {
            return 'website.register.charname_invalid';
        }

        if(failIfExists) {
            const findUser = await UserEntity.exists({
                where: {
                    charname
                }
            });
            if(findUser) {
                return 'website.register.charname_already_exists';
            }
        }
        return true;
    }


}
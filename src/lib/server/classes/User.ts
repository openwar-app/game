import UserEntity from "$lib/server/database/Entities/User";
import emailValidator from "email-validator";
export class User extends UserEntity {
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
}
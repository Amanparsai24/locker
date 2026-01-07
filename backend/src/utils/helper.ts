export default class Helper {

    static sanitizeUser = (user: any) => {
        const { password, ...safeUser } = user.toJSON
            ? user.toJSON()
            : user;
        return safeUser;
    };

}
export default class Helper {
    static sanitizeUser = (user) => {
        const { password, ...safeUser } = user.toJSON
            ? user.toJSON()
            : user;
        return safeUser;
    };
}

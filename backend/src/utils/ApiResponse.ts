export default class ApiResponse {
    static success(
        message: string,
        result: any = null,
        token?: string
    ) {
        return {
            success: true,
            message,
            result,
            ...(token && { token }),
        };
    }

    static error(message: string, statusCode = 500) {
        return {
            success: false,
            message,
            statusCode,
        };
    }
}


// export default class ApiResponse {
//     static success(message: string, data: any = {}) {
//         return {
//             success: true,
//             message,
//             data,
//         };
//     }

//     static error(message: string, statusCode = 500) {
//         return {
//             success: false,
//             message,
//             statusCode,
//         };
//     }
// }

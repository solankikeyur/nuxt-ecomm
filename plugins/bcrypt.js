import bcryptjs from "bcryptjs";
export default defineNuxtPlugin((NuxtApp) => {
    return {
        provide: {
            bcryptjs: bcryptjs,
            salt: 10
        }
    }
})
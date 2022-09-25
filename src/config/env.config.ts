export const EnvConfiguration = () =>({
    envitoment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 8000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 20
})
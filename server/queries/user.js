export const queryToGetUserDetailsById = (id) => `
SELECT id as "id", user_id as "user_id", name as "name", email as "email" from users where user_id='${id}'
`

export const queryForAuthentication = (email) => `
    SELECT id as "id", user_id as "user_id", name as "name", email as "email", password as "password" from users where email='${email}'
`
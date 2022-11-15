import Joi from 'joi'
import jwt from "jsonwebtoken"
import db from "../../utils/database.js"
import { queryToGetUserDetailsById, queryForAuthentication } from "../../queries/user.js"
class UserController {

    getUserDetails = async (req, res) => {
        const schema = Joi.object({
            userId: Joi.string().required()
        }).required()
        const { value, error } = schema.validate({
            userId:req.user.id
        })
        if (error)
            return res.status(400).json({ error: error?.message })

        const { userId } = value
        try {
            const rows = await db(queryToGetUserDetailsById(userId))
            rows.length ?
                res.status(200).json({
                    user: rows[0]
                })
                : res.status(404).json({ error: 'User not found' })
        } catch (err) {
            res.status(500).json({
                error: err?.message
            })
        }
    }

    loginUser = async (req, res) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        }).required()

        const { value, error } = schema.validate({
            email: req.body.email,
            password: req.body.password
        })
        if (error)
            return res.status(400).json({ error: error?.message })

        try {
            const { email, password } = value
            const rows = await db(queryForAuthentication(email))
            if (!rows.length)
                return res.status(404).json({ error: 'User not found' })
         
            const match = password === rows[0].password;
            if (!match)
                return res.status(401).json({
                    error: 'Unauthorized'
                })

            const { user_id, password:p, ...rest } = rows[0]
            //generate a jwt
            const authToken = jwt.sign({id:user_id},process.env.JWT_SECRET,{
                expiresIn:'48h'
            })
            res.status(200).json({
                token: authToken,
                expAt: Date.now() + (48 * 3600000),
                user:{
                    user_id,
                    ...rest
                }
            })
        } catch (err) {
            res.status(500).json({
                error: err?.message
            })
        }
    }
}

export default new UserController;
import Joi from "joi"
import db from "../../utils/database.js"
import { queryToGetInventoryData, queryToUpdateInventory } from "../../queries/inventory.js"
class InventoryController {

    getInventoryDetails = async (req, res) => {
        const schema = Joi.object({
            type: Joi.string().valid('ON-PREM', 'MDM', 'IICS').required()
        }).required()

        const { value, error } = schema.validate({
            type: req.params.type
        })

        if (error)
            return res.status(400).json({
                error: error?.message
            })
        const { type } = value
        try {
            const rows = await db(queryToGetInventoryData(type))
            res.status(200).json({
                data: rows
            })
        } catch (err) {
            res.status(500).json({
                error: err?.message
            })
        }

    }

    updateInventoryDetails = async (req, res) => {

        const schema = Joi.object({
            type: Joi.string().valid('ON-PREM', 'MDM', 'IICS').required(),
            data: Joi.object().pattern(Joi.string(), Joi.string().required()).min(1),
            ID: Joi.alternatives(Joi.string(), Joi.number()).required()
        }).required()

        const { value, error } = schema.validate({
            type: req.body.type,
            data: req.body.data,
            ID: req.body.ID
        })
        if (error) {
            return res.status(400).send(error?.message)
        }
        const { type, data, ID } = value
        try {
            const response = await db(queryToUpdateInventory(type, data, ID))
            console.log(response)
            res.status(200).send('Data updated')
        } catch (err) {
            res.status(500).json({
                error: err?.message
            })
        }
    }
}

export default new InventoryController()
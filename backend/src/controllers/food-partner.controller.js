const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {
    const { id } = req.params;

    try {
        const foodPartner = await foodPartnerModel.findById(id);

        const foodItemsByFoodPartner = await foodModel.find({ FoodPartner: foodPartner });

        if (!foodPartner) {
            return res.status(404).json({ message: 'Food Partner not found' });
        }
        res.status(200).json({message: "Food Partner retrieved successfully", foodPartner:{
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
}

module.exports = {
    getFoodPartnerById,
};
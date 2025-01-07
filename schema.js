const Joi = require("joi");
// module.exports.listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     price: Joi.number().required(),
//     country: Joi.string().required(),
//     location: Joi.string().required().min(0),
//     image: Joi.string().allow("", null)
//     // image: Joi.object({
//     //   url: Joi.string().required(),
//     //   filename: Joi.string().required(),
//     // }).required()

//   }).required()
// })

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    country: Joi.string().required(),
    location: Joi.string().required().min(1),  // Corrected the min length validation
    image: Joi.object({
      url: Joi.string().required(),           // URL should be a valid string
      filename: Joi.string().required(),      // Filename should be a valid string
    }).allow(null, "").optional()             // Allow null or empty for optional image field
  }).required()
});


module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required()
})
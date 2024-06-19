import response from "../helpers/helper.js";
import Membership from "../models/membershipSchema.js";

const getMembership = async (req, res) => {
  try {
    const membership = await Membership.find();
    res
      .status(200)
      .json(
        response.responseData(
          "Membership fetched successfully",
          membership,
          true
        )
      );
  } catch (error) {
    res.status(404).json(response.responseData(error.message, {}, false));
  }
};

const createMembership = async (req, res) => {
  const { title, content } = req.body;
  const newMembership = new Membership({
    title,
    content,
  });
  try {
    await newMembership.save();
    res
      .status(201)
      .json(
        response.responseData(
          "Membership created successfully",
          newMembership,
          true
        )
      );
  } catch (error) {
    res.status(409).json(response.responseData(error.message, {}, false));
  }
};

export { getMembership, createMembership };

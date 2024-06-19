import team from "../models/teamSchema.js";

const createTeam = async (req, res) => {
  // const { name, sport, teamtype, coachId, playerId } = req.body;
  // // const aggregateDate = await team.aggregate([
  // //   {
  // //     $lookup: {
  // //       from: "coach",
  // //       localField: "coachId",
  // //       foreignField: "_id",
  // //       as: "coach",
  // //     },
  // //   },
  // // ]);
  // const teaam = new team({
  //   name,
  //   sport,
  //   teamtype,
  //   coachId,
  //   playerId,
  // });
  // try {
  //   await teaam.save();
  //   res.status(201).json(teaam);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};

const getTeams = async (req, res) => {};

const deleteTeam = async (req, res) => {};

export { createTeam, getTeams };

import Society from "../models/society.model.js";

export async function getSocietiesController(req, res) {
  try {
    const societies = await Society.find()
      .select("_id name description")
      .sort({ name: 1 });

    return res.status(200).json({
      success: true,
      count: societies.length,
      societies,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

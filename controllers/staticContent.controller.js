import StaticContent from "../models/staticContent.js";

const getStaticContent = async (req, res) => {
  let staticContent = await StaticContent.findOne({ slug: req.query.slug });
  if (!staticContent) {
    return res
      .status(200)
      .json({ success: false, message: "Content not found" });
  }
  res.status(200).json(staticContent);
};

const createStaticContent = async (req, res) => {
  const { title, content, slug } = req.body;

  const newStaticContent = new StaticContent({
    title,
    content,
    slug,
  });
  try {
    await newStaticContent.save();
    res.status(201).json(newStaticContent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export { getStaticContent, createStaticContent };

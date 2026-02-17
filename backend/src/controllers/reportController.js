import Quiz from "../models/Quiz.js";

export const generateReport = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;

    // Filter quizzes based on date range and category
    const filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        const start = new Date(startDate);
        if (Number.isNaN(start.getTime())) {
          return res.status(400).json({ message: "Invalid startDate" });
        }
        filter.createdAt.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        if (Number.isNaN(end.getTime())) {
          return res.status(400).json({ message: "Invalid endDate" });
        }
        end.setHours(23, 59, 59, 999); // include full end day
        filter.createdAt.$lte = end;
      }
    }
    if (category?.trim()) {
      filter.category = { $regex: category.trim(), $options: "i" };
    }

    const quizzes = await Quiz.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    if (!quizzes || quizzes.length === 0) {
      return res.status(200).json([]);
    }

    // Optionally: Format for report
    const reportData = quizzes.map((q) => ({
      user: q.user.name || "Deleted User",
      email: q.user.email || "N/A",
      questionCount: q.questions.length,
      score: q.score,
      date: q.createdAt.toISOString(),
      category: q.category || "General Awareness",
    }));

    res.json(reportData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating report." });
  }
};

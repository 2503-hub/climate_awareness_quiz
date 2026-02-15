import Quiz from "../models/Quiz.js";

export const generateReport = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;

    // Filter quizzes based on date range and category
    const filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    if (category) filter.category = category;

    const quizzes = await Quiz.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    if (!quizzes || quizzes.length === 0)
      return res.status(404).json({ message: "No data available." });

    // Optionally: Format for report
    const reportData = quizzes.map((q) => ({
      user: q.user.name || "Deleted User",
      email: q.user.email || "N/A",
      questionCount: q.questions.length,
      score: q.score,
      date: q.createdAt.toISOString(),
      category: q.category,
    }));

    res.json(reportData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating report." });
  }
};

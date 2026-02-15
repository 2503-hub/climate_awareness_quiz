import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Questions.js";

dotenv.config();

const questions = [
  {
    question: "1.Which of the following is the largest contributor to global climate change?",
    options: [
      "Volcanic eruptions",
      "Burning fossil fuels",
      "Changes in Earth's orbit",
      "Deforestation",
    ],
    correctAnswer: "Burning fossil fuels",
    difficulty: "easy",
  },
  {
    question: "2.What percentage of global greenhouse gas emissions is accounted for by fossil fuels?",
    options: [
      "Around 30 percent",
      "Around 50 percent",
      "Around 68 percent",
      "Around 90 percent",
    ],
    correctAnswer: "Around 68 percent",
    difficulty: "easy",
  },
  {
    question: "3.What is the primary effect of greenhouse gas emissions blanketing the Earth?",
    options: [
      "Cooling the planet",
      "Trapping the sun's heat",
      "Increasing volcanic activity",
      "Decreasing sea levels",
    ],
    correctAnswer: "Trapping the sun's heat",
    difficulty: "easy",
  },
  {
    question: "4.How is the world currently warming compared to any point in recorded history?",
    options: ["Slower", "At the same rate", "Faster", "It is not warming"],
    correctAnswer: "Faster",
    difficulty: "easy",
  },
  {
    question: "5.What are some risks posed by warmer temperatures and changing weather patterns?",
    options: [
      "Increased biodiversity",
      "Disruption of nature's balance",
      "More stable ecosystems",
      "Decreased human health issues",
    ],
    correctAnswer: "Disruption of nature's balance",
    difficulty: "easy",
  },
  {
    question: "6.What is a significant consequence of cutting down forests in relation to climate change?",
    options: [
      "Increased oxygen production",
      "Release of stored carbon",
      "Enhanced soil fertility",
      "Promotion of biodiversity",
    ],
    correctAnswer: "Release of stored carbon",
    difficulty: "easy",
  },
  {
    question: "7.Approximately how many million hectares of forest are destroyed each year?",
    options: ["1 million", "5 million", "10 million", "20 million"],
    correctAnswer: "10 million",
    difficulty: "easy",
  },
  {
    question: "8. What is deforestation's role in global greenhouse gas emissions?",
    options: [
      "It has no impact",
      "It is responsible for roughly a third",
      "It is responsible for half",
      "It is responsible for a quarter",
    ],
    correctAnswer: "It is responsible for roughly a third",
    difficulty: "easy",
  },
  {
    question: "9.Which sector is a major contributor of greenhouse gases due to petroleum-based combustion?",
    options: ["Agriculture", "Manufacturing", "Transportation", "Powering buildings"],
    correctAnswer: "Transportation",
    difficulty: "easy",
  },
  {
    question: "10.What percentage of global energy-related CO₂ emissions does transport account for?",
    options: [
      "Nearly one quarter",
      "Nearly half",
      "Nearly three quarters",
      "Less than 10 percent",
    ],
    correctAnswer: "Nearly one quarter",
    difficulty: "easy",
  },
   {
    question: "11. What greenhouse gases are primarily associated with producing food?",
    options: [
      "Oxygen and Nitrogen",
      "Carbon dioxide, methane, and other greenhouse gases",
      "Sulfur dioxide and carbon monoxide",
      "Ozone and water vapor",
    ],
    correctAnswer: "Carbon dioxide, methane, and other greenhouse gases",
    difficulty: "easy",
  },
   {
    question: "12.What activities related to food production contribute to climate change?",
    options: [
      "Sustainable farming practices only",
      "Deforestation, clearing of land for agriculture, grazing by cows and sheep, use of fertilizers, and fossil fuels for farming/fishing",
      "Increased organic farming",
      "Reduced meat consumption",
    ],
    correctAnswer: "Deforestation, clearing of land for agriculture, grazing by cows and sheep, use of fertilizers, and fossil fuels for farming/fishing",
    difficulty: "easy",
  },
  {
    question: "13.What percentage of global electricity is consumed by residential and commercial buildings?",
    options: [
      "Nearly 20 percent",
      "Nearly 40 percent",
      "Nearly 60 percent",
      "Nearly 80 percent",
    ],
    correctAnswer: "Nearly 40 percent",
    difficulty: "easy",
  },
  {
    question: "14.What contributes to a rise in carbon-dioxide emissions from buildings in recent years?",
    options: [
      "Increased use of renewable energy",
      "Growing energy demand for heating and cooling, with rising air-conditioner ownership",
      "Improved building insulation",
      "Decreased population density",
    ],
    correctAnswer: "Growing energy demand for heating and cooling, with rising air-conditioner ownership",
    difficulty: "easy",
  },
  {
    question: "15.What is the responsibility of the 20 largest economies regarding global emissions?",
    options: [
      "They are responsible for almost 20 percent",
      "They are responsible for almost 40 percent",
      "They are responsible for almost 60 percent",
      "They are responsible for almost 80 percent",
    ],
    correctAnswer: "They are responsible for almost 80 percent",
    difficulty: "easy",
  },
  {
    question: "16.What is a direct consequence of hotter temperatures on land areas?",
    options: [
      "Decreased heat-related illnesses",
      "More difficult outdoor work",
      "Increased agricultural yields",
      "Reduced wildfire frequency",
    ],
    correctAnswer: "More difficult outdoor work",
    difficulty: "easy",
  },
  {
    question: "17.How much faster have temperatures in the Arctic warmed compared to the global average?",
    options: [
      "At the same rate",
      "Slightly faster",
      "At least twice as fast",
      "Slower",
    ],
    correctAnswer: "At least twice as fast",
    difficulty: "easy",
  },
  {
    question: "18.What causes more intense and frequent severe storms?",
    options: [
      "Decreased atmospheric moisture",
      "Increased evaporation due to warmer temperatures",
      "Stable weather patterns",
      "Reduced ocean warming",
    ],
    correctAnswer: "Increased evaporation due to warmer temperatures",
    difficulty: "easy",
  },
  {
    question: "19.What are some consequences of more severe storms?",
    options: [
      "Reduced flooding",
      "Less destructive storms",
      "Flooding, cyclones, hurricanes, typhoons, and economic losses",
      "Improved water quality",
    ],
    correctAnswer: "Flooding, cyclones, hurricanes, typhoons, and economic losses",
    difficulty: "easy",
  },
  {
    question: "20.What is a major concern regarding climate change and water availability?",
    options: [
      "Increased water resources globally",
      "Scarcity in more regions",
      "Stable water cycles",
      "Reduced need for irrigation",
    ],
    correctAnswer: "Scarcity in more regions",
    difficulty: "easy",
  },
];

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");

    await Question.deleteMany();
    await Question.insertMany(questions);

    console.log(" Questions seeded successfully");
    process.exit();
  } catch (error) {
    console.error(" Seeding failed:", error);
    process.exit(1);
  }
};

seedQuestions();

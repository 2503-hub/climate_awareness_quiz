import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Leaf } from "lucide-react";

import greenhouseImg from "../assets/greenhouse.png";
import deforestationImg from "../assets/deforestation.jpg";
import renewableImg from "../assets/renewable.png";
import seaLevelImg from "../assets/seaLevel.jpg";
import globalImg from "../assets/global.png";

const articlesData = [
  {
    id: 1,
    title: "Understanding the Greenhouse Effect",
    content:
      "The greenhouse effect is a natural process that keeps our planet warm enough to support life. However, human activities like burning fossil fuels increase greenhouse gases in the atmosphere, trapping more heat and accelerating global warming. Imagine you are sitting inside a car on a sunny day with the windows rolled up. The sunlight comes through the glass and warms up the seats and the dashboard. That heat gets trapped inside because it can't get back out through the glass as easily as it came in. The car gets much warmer than the air outside.Earth works exactly the same way! ",
    image: greenhouseImg,
  },
  {
    id: 2,
    title: "Deforestation and Climate Impact",
    content:
      "Forests absorb carbon dioxide from the atmosphere, acting as natural carbon sinks. When trees are cut down, not only is this absorption reduced, but stored carbon is also released back into the atmosphere, intensifying climate change.",
    image: deforestationImg,
  },
  {
    id: 3,
    title: "The Rise of Renewable Energy",
    content: "Renewable energy sources such as solar and wind power produce little to no greenhouse gas emissions. Transitioning to renewable energy is one of the most effective ways to combat climate change and reduce global carbon footprints. ",
    image: renewableImg,
  },
  {
    id: 4,
    title: "Rising Sea Levels: A Global Concern",
    content:
      "As global temperatures rise, glaciers and polar ice caps melt, causing sea levels to increase. Rising sea levels threaten coastal communities, ecosystems, and infrastructure worldwide. Think of the ocean like a giant bathtub. Usually, the water level stays about the same. But today, we are \"filling the tub\" from two different faucets at the same time. As a result, the water is slowly climbing up the sides, threatening the homes of millions of people who live near the shore.",
    image: seaLevelImg,
  },
  {id: 5,
    title: "Global Warming",
    content:
      "If the Greenhouse Effect is a \"blanket,\" then Global Warming is what happens when that blanket becomes too thick and the person underneath starts to sweat. It is the unusually rapid increase in Earth's average surface temperature over the past century, primarily due to human activities.",
    image: globalImg,
  }
];

export default function FunFacts() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(articlesData);
  }, []);

  return (
    <div className="articles-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={20} />
        <span>Dashboard</span>
      </button>

      {/* Title */}
      <h2 className="articles-title">
        <Leaf size={28} /> Climate Change Articles
      </h2>

      {articles.map((article, index) => (
        <div
          key={article.id}
          className={`article-section ${
            index % 2 !== 0 ? "reverse" : ""
          }`}
        >
          <div className="article-image">
            <img src={article.image} alt={article.title} />
          </div>

          <div className="article-content">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </div>
        </div>
      ))}

      <style>{styles}</style>
    </div>
  );
}

const styles = `
.articles-container {
  padding: 3rem 2rem;
  min-height: 100vh;
  background: #e6f4f1; /* mint */
  animation: fadeIn 0.6s ease-in-out;
  position: relative;
}

/* Back Button */
.back-btn {
  position: absolute;
  top: 1.8rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  color: #356859; /* olive */
  box-shadow: 0 4px 12px rgba(53, 104, 89, 0.15);
  transition: all 0.25s ease;
}

.back-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(53, 104, 89, 0.25);
}

/* Title */
.articles-title {
  text-align: center;
  font-size: 2.2rem;
  color: #356859;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
}

/* Article Layout */
.article-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 4rem;
  animation: slideUp 0.6s ease forwards;
}

/* Alternate layout */
.article-section.reverse {
  flex-direction: row-reverse;
}

/* Image */
.article-image {
  flex: 1;
  max-width: 500px;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(53, 104, 89, 0.15);
}

.article-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.4s ease;
}

.article-image:hover img {
  transform: scale(1.05);
}

/* Content */
.article-content {
  flex: 1;
  max-width: 600px;
}

.article-content h3 {
  font-size: 1.6rem;
  color: #2d6e5a;
  margin-bottom: 1rem;
}

.article-content p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #3c7d68;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 992px) {
  .article-section {
    flex-direction: column;
    text-align: center;
  }

  .article-section.reverse {
    flex-direction: column;
  }

  .article-content {
    max-width: 100%;
  }

  .article-image {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .articles-container {
    padding: 2rem 1.2rem;
  }

  .articles-title {
    font-size: 1.7rem;
  }

  .back-btn {
    top: 1rem;
    right: 1rem;
    padding: 0.4rem 0.8rem;
  }
}
`;

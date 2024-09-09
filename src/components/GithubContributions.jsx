import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const GithubContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);

  const API_KEY = import.meta.env.VITE_GITHUB_KEY;

  // List of months to label the graph
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await axios.post(
          "https://api.github.com/graphql",
          {
            query: `
              {
                user(login: "dilsher07singh") {
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          contributionCount
                          date
                          color
                        }
                      }
                    }
                  }
                }
              }
            `,
          },
          {
            headers: {
              Authorization: `bearer ${API_KEY}`,
            },
          }
        );

        const contributionCalendar =
          response.data.data.user.contributionsCollection.contributionCalendar;
        setContributions(contributionCalendar.weeks); // Set weeks data
        setTotalContributions(contributionCalendar.totalContributions); // Set total contributions
      } catch (error) {
        console.error("Error fetching GitHub contributions", error);
      }
    };

    fetchContributions();
  }, []);

  return (
    <div className="border-b border-neutral-900 pb-4">
      {/* SEO Optimized Heading */}
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-4xl"
      >
        GitHub Contributions
      </motion.h1>

      {/* Display total contributions */}
      <p className="text-center text-lg mb-8">
        Last Year GitHub Contributions: {totalContributions}
      </p>

      {/* Month labels */}
      <div
        className="flex justify-center mb-4"
        aria-label="Month labels for contribution graph"
      >
        {monthLabels.map((month, index) => (
          <span key={index} className="w-12 text-center text-sm">
            {month}
          </span>
        ))}
      </div>

      {/* GitHub-style contribution graph */}
      <div className="flex justify-center space-x-1 overflow-auto">
        {contributions.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col space-y-1">
            {week.contributionDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="w-4 h-4 md:w-6 md:h-6"
                style={{ backgroundColor: day.color }}
                title={`${day.contributionCount} contributions on ${day.date}`}
                aria-label={`${
                  day.contributionCount
                } contributions on ${new Date(day.date).toLocaleDateString()}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GithubContributions;

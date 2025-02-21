"use client";

import React, { useState } from "react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


const crimes = [
  { 
    type: "Product Quality", 
    date: "April 1st, 2024", 
    time: "11:12 AM", 
    description: "The customer mentioned that the product quality exceeded expectations, though the packaging could be improved."
  },
  { 
    type: "Customer Service", 
    date: "April 2nd, 2024", 
    time: "1:02 PM", 
    description: "A customer reported a delay in response times from support, highlighting the need for more efficient service."
  },
  { 
    type: "Website Usability", 
    date: "Mar 30th, 2024", 
    time: "9:53 AM", 
    description: "Feedback indicated that while the website is generally intuitive, the checkout process felt a bit confusing."
  },
  { 
    type: "Pricing", 
    date: "April 5th, 2024", 
    time: "6:38 PM",
    description: "Some customers mentioned that the products seem slightly overpriced compared to alternatives in the market."
  },
  { 
    type: "Product Quality", 
    date: "April 5th, 2024", 
    time: "8:12 PM", 
    description: "Another customer provided feedback on product durability, suggesting improvements for long-term use."
  },
  { 
    type: "Customer Service", 
    date: "April 6th, 2024", 
    time: "3:12 PM", 
    description: "Positive feedback was received for prompt support, with a suggestion to incorporate live chat features."
  },
  { 
    type: "Website Usability", 
    date: "April 6th, 2024", 
    time: "5:12 PM", 
    description: "Feedback also pointed out that website navigation, especially on mobile, could be further optimized for ease of use."
  }
];

const AnalyticsPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState({});
  const [loading, setLoading] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [displaySummary, setDisplaySummary] = useState("");
  const [isTyping, setIsTyping] = useState(false);  

  const fullSummary = `
  <p><strong>Feedback Analysis Summary</strong></p>
  <p>This summary compiles customer feedback received between March 30th, 2024 and April 6th, 2024, based on reviews and direct customer comments.</p>
  <br />
  <p><strong><u>Recurring Feedback Themes</u></strong></p>
  <ul>
    <li><strong>Product Quality:</strong> Multiple customers praised the overall quality but highlighted issues with packaging and durability. There is an opportunity to refine the product design and packaging.</li>
    <li><strong>Customer Service:</strong> Feedback reflects mixed experiences with support. While some customers appreciated prompt service, others experienced delays, suggesting a need for faster responses.</li>
  </ul>
  <br />
  <p><strong><u>Other Notable Feedback</u></strong></p>
  <ul>
    <li><strong>Website Usability:</strong> Several users found the website user-friendly, though improvements in the checkout process and mobile navigation were noted.</li>
    <li><strong>Pricing:</strong> A few customers indicated that the product may be priced higher than comparable offerings, pointing to a potential review of the pricing strategy.</li>
  </ul>
  <br />
  <p><strong><u>Recommendations</u></strong></p>
  <ul>
    <li><strong>Enhance Product Quality:</strong> Address feedback regarding packaging and durability to improve customer satisfaction.</li>
    <li><strong>Improve Customer Service:</strong> Optimize response times and consider adding live chat support to enhance customer interaction.</li>
    <li><strong>Optimize Website Usability:</strong> Streamline the checkout process and enhance mobile navigation for a smoother user experience.</li>
    <li><strong>Review Pricing Strategy:</strong> Conduct market analysis to adjust pricing in line with customer expectations and competitor offerings.</li>
  </ul>
  <br />
  <p><strong><u>Conclusion</u></strong></p>
  <p>This feedback analysis highlights key areas of strength and opportunities for improvement. By addressing these recurring themes, the company can enhance overall customer satisfaction and drive business growth.</p>
`;


  const handleCardClick = (crime) => {
    setSelectedCrime(crime);
    setModalShow(true);
  };

  const handleGenerateSummary = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsTyping(true);
      setDisplaySummary("");  
      setSummaryText(fullSummary);
      displayTextByLetter(fullSummary, 0);
    }, 2000);
  };


  const chunkSize = 3;
  const displayTextByLetter = (text, index) => {
    if (index < text.length) {
      const nextIndex = index + chunkSize;
      const textToAdd = text.slice(index, nextIndex);
      setTimeout(() => {
        setDisplaySummary((prev) => prev + textToAdd);
        displayTextByLetter(text, nextIndex);
      }, 1);
    } else {
      setIsTyping(false);
      setLoading(false);
    }
  };


  return (
    <div className="relative">
      <Header />

      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8 min-h-screen pt-28">
        <Card className="p-6 pb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Feedback Reports</h1>
            <p className="text-gray-500 dark:text-gray-400">All the feedback reports from the past seven days in store, generated by Gemini.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {crimes.map((crime, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => handleCardClick(crime)}>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{crime.type}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{crime.date}</p>
                  <p className="text-gray-500 dark:text-gray-400">{crime.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 pb-8 mt-10 mb-20">
  <div className="">
    <h1 className="text-3xl font-bold">Feedback Analysis Summary</h1>
    <p className="text-gray-500 dark:text-gray-400">
      Generate a summary of the customer feedback above using Gemini, which includes common themes, trends, and actionable insights.
    </p>
  </div>
  <div className="text-gray-700 my-4 font-semibold" dangerouslySetInnerHTML={{ __html: displaySummary }}></div>
  <Button onClick={handleGenerateSummary} disabled={loading || isTyping}>
    {loading || isTyping ? "Generating..." : "Generate Summary"}
  </Button>
</Card>
      </main>

      <Modal show={modalShow} onClose={() => setModalShow(false)} crime={selectedCrime} />

      <Footer />
    </div>
  );
};

export default AnalyticsPage;


const Modal = ({ show, onClose, crime }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center px-4 py-8 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-800 dark:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">{crime.type}</h3>
          <p className="text-sm text-gray-600">Date: {crime.date} | Time: {crime.time}</p>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Details of the Incident:</h4>
          <p className="text-gray-700 dark:text-gray-300">
            {crime.description || "No detailed description available."}
          </p>
        </div>
      </div>
    </div>
  );

};
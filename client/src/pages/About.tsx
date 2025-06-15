import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 font-sans">
      <h1 className="text-2xl font-bold">
        🎥 About Our Video Streaming Platform
      </h1>
      <p className="mt-4">
        <strong>Our Video Streaming Platform</strong> is your go-to destination
        for a diverse range of video content, from movies and series to
        documentaries and live events. Whether you're looking for entertainment
        or education, we have something for everyone! 🍿
      </p>
      <p className="mt-2">
        🔐 Sign up is easy and secure, allowing you to enjoy personalized
        recommendations and exclusive content.
      </p>

      <h2 className="text-xl font-semibold mt-6">🚀 How It Works</h2>
      <ul className="list-disc list-inside mt-2">
        <li>📺 Stream your favorite shows and movies anytime, anywhere</li>
        <li>🔒 Secure access with a simple registration process</li>
        <li>🎉 Join a community of fellow viewers and share your thoughts</li>
      </ul>

      <hr className="my-8" />

      <div className="flex justify-between items-start flex-wrap">
        <div className="flex-1 pr-4">
          <h1 className="text-2xl font-bold">💼 About FlowHooks</h1>
          <p className="mt-4">
            <strong>FlowHooks</strong> is a B2B software company delivering
            advanced tech solutions for businesses of all sizes. We specialize
            in:
          </p>

          <h2 className="text-xl font-semibold mt-6">💡 What We Do</h2>
          <ul className="list-disc list-inside mt-2">
            <li>🌐 Custom SaaS platforms</li>
            <li>🔐 Robust cybersecurity solutions</li>
            <li>🧠 Strategic IT consulting</li>
            <li>💻 Responsive web development</li>
          </ul>

          <p className="mt-4">
            We help businesses grow by offering scalable, secure, and
            high-performance technology that adapts to their needs. 🚀
          </p>

          <h2 className="text-xl font-semibold mt-6">🌟 Our Vision</h2>
          <p className="mt-2">
            At FlowHooks, we’re committed to building the future together,
            providing the tools that empower innovation and growth. 🌱
          </p>

          <h2 className="text-xl font-semibold mt-6">📬 Contact</h2>
          <p className="mt-2">
            <strong>Felipe Cezar Paz</strong>
            <br />
            CEO & Lead Developer
            <br />
            Email:{" "}
            <a
              href="mailto:contact@felipecezar.com"
              className="text-blue-500 hover:underline"
            >
              contact@felipecezar.com
            </a>
          </p>
        </div>

        <div className="flex-2 text-right">
          <img
            src="/flowhooks-logo.png"
            alt="FlowHooks Logo"
            className="max-w-xs h-auto mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default About;

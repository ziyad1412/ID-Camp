import React from "react";
import { createRoot } from "react-dom/client";

function Button({ link }) {
  // TODO: selesaikan component-nya
  return <a href="{link}">Find Out More</a>;
}

function CardHeader({ image, category }) {
  // TODO: selesaikan component-nya
  return (
    <header>
      <h1>{category}</h1>
      <img src="{image}" alt="{category}" />
    </header>
  );
}

function CardBody({ title, date, content, link }) {
  // TODO: selesaikan component-nya
  return (
    <div>
      <p>{date}</p>
      <h2>{title}</h2>
      <p>{content}</p>
      <Button link="{link}" />
    </div>
  );
}

function Card({ image, category, title, date, content, link }) {
  // TODO: selesaikan component-nya
  return (
    <article>
      <CardHeader image="{image}" category="{category}" />
      <CardBody
        title="{title}"
        date="{date}"
        content="{content}"
        link="{link}"
      />
    </article>
  );
}

function Header({ title, subtitle }) {
  // TODO: selesaikan component-nya
  return (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

function News() {
  // data news
  const someNews = [
    {
      title: "CNN Acuire BEME",
      date: "March 20 2022",
      content: "CNN purchased Casey Neistat's Beme app for $25million.",
      image: "https://source.unsplash.com/user/erondu/600x400",
      category: "News",
      link: "#",
    },
    {
      title: "React and the WP-API",
      date: "March 19 2022",
      content: "The first ever decoupled starter theme for React & the WP-API.",
      image: "https://source.unsplash.com/user/ilyapavlov/600x400",
      category: "News",
      link: "#",
    },
    {
      title: "Nomad Lifestyle",
      date: "March 19 2022",
      content: "Learn our tips and tricks on living a nomadic lifestyle.",
      image: "https://source.unsplash.com/user/erondu/600x400",
      category: "Travel",
      link: "#",
    },
  ];

  // TODO: selesaikan component-nya
  return (
    <div>
      <Header title="My Blog" subtitle="A headline" />
      <div>
        {someNews.map((news) => (
          <Card
            title={news.title}
            date={news.date}
            content={news.content}
            image={news.image}
            category={news.category}
            link={news.link}
          />
        ))}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<News />);

import React, { useEffect, useState } from 'react';
import './newsPage.scss';
import { News } from '../../../widgets/post';
import { getPosts } from '../model/getPosts';

export const NewsPage: React.FC = () => {
  const [news, setNews] = useState<null | any[]>(null);

  useEffect(() => {
    (async () => {
      const posts = await getPosts();
      setNews(posts);
      console.log(posts);
    })();
  }, []);
  return (
    <div>
      <h1>Новости</h1>
      <div className="posts">
        {news &&
          news.map((news) => {
            return <News userName={news.User.login} post={news} />;
          })}
      </div>
    </div>
  );
};

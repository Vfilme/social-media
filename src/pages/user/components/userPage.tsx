import React, { useEffect, useState } from 'react';
import { News } from '../../../widgets/post/components/post';
import { getUserPosts } from '../model/getUserPosts';
import { removePost } from '../model/removePost';
import { addPost } from '../model/addPost';

export const UserPage: React.FC = () => {
  const [userPosts, setUserPosts] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    (async () => {
      const userPosts = await getUserPosts();
      setUserPosts(userPosts);
    })();
  }, []);

  return (
    <div>
      <h1>user page</h1>
      <p>
        {userPosts &&
          userPosts.map((e: any) => {
            return (
              <div>
                <News post={e} />
                <button
                  onClick={() => {
                    removePost(e.id);
                  }}
                >
                  удалить пост
                </button>
              </div>
            );
          })}
      </p>
      <h3>create post:</h3>
      <form onSubmit={(e) => addPost(e, title, content)} className="createPost">
        <p>заголовок:</p>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <p>содержание</p>
        <input
          type="text"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <br />
        <button type="submit">создать пост</button>
      </form>
    </div>
  );
};

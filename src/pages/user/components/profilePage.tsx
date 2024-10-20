import React, { useEffect, useState } from 'react';
import { News } from '../../../widgets/post/components/post';
import { getUserPosts } from '../model/getUserPosts';
import { removePost } from '../model/removePost';
import { addPost } from '../model/addPost';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../shared/store/hooks/useAppSelector';
import axios from 'axios';
import { URL } from '../../../shared/const/urls';
import './profilePage.scss';
import { getChatId } from '../model/startChat';

export const ProfilePage: React.FC = () => {
  const { login } = useParams();
  const [userPosts, setUserPosts] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [profile, setProfile] = useState({ name: '', surname: '', age: '' });
  const user: any = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const openChat = async (partnerLogin: string) => {
    const chatId: any = await getChatId(user.login, partnerLogin);
    navigate(`/messenger/${chatId}`);
  };

  useEffect(() => {
    (async () => {
      if (login) {
        const userPosts = await getUserPosts(login);
        setUserPosts(userPosts);
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      const getMyProfile = async () => {
        try {
          const { data } = await axios.get(`${URL.BAZE}/user/profile`, {
            withCredentials: true,
            params: { login },
          });
          console.log(data);
          setProfile({
            name: data.user.name,
            surname: data.user.surname,
            age: data.user.age,
          });
        } catch (error) {
          console.log(error);
        }
      };
      getMyProfile();
    }
  }, [user]);

  return (
    <div className="profile-page">
      <h1>Пользователь: {login}</h1>
      <h2>Имя: {profile.name}</h2>
      <h2>Фамилия: {profile.surname}</h2>
      <h2>Возраст: {profile.age}</h2>
      <div
        className={`${user?.login == login && 'edit'} user-menu`}
        onClick={() => openChat(user.login)}
      >
        написать пользователю
      </div>
      <h2>Посты:</h2>
      <div>
        {userPosts &&
          userPosts.map((e: any) => {
            return (
              <div>
                <News post={e} />
                <div className={`${user?.login != login && 'edit'}`}>
                  <button
                    onClick={() => {
                      removePost(e.id);
                    }}
                  >
                    удалить пост
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className={`${user?.login != login && 'edit'}`}>
        <h3>create post:</h3>
        <form
          onSubmit={(e) => addPost(e, title, content)}
          className="createPost"
        >
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
    </div>
  );
};

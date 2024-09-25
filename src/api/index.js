import { get, post, put, del } from './client';


export const fetchAnimeList = () => {
  return get('');
};

export const fetchSavedFilterList = () => {
  return [];
};




/*
export const createUser = (formData) => {
  return post('/users', formData);
};

export const updateUser = (userId, formData) => {
  return put(`/users/${userId}`, formData);
};

export const deleteUser = (userId) => {
  return del(`/users/${userId}`);
};
*/
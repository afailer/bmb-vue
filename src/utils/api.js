import {get, post,del, patch} from './axios'

const indexWord = ''
export const login = (data) => {
  const url = indexWord + '/login';
  return post(url, data)
}

const contentUrl = indexWord + '/api/v1/content/content';

export const addContent = (data) => {
  return post(contentUrl,data)
}

export const getContent = () => {
  return get(contentUrl)
}

export const delContent = (id) => {
  return del(`${contentUrl}?id=${id}`)
}

export const patchContent = (data)  => {
  return patch(contentUrl, data)
}

const  contentUrlc = indexWord + '/api/v1/content/getContentById'
export const getContentById = (id) => {
  return get(contentUrlc + `?id=${id}`)
}
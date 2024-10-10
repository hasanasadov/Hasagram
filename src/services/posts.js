import { BASE_URL } from "@/constants";
import axios from "axios";

export async function getPosts({ pageParam, search = "",sort = "" }) {
  try {
    const response = await axios(
      `${BASE_URL}/posts?page=${pageParam}&search=${search}&sort=${sort}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}
export async function createPost({ formData }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.post(`${BASE_URL}/posts`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function editPost({ id, formData }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.put(`${BASE_URL}/posts/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function deletePost({ id }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.delete(`${BASE_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function likePost({ id }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.post(`${BASE_URL}/posts/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function dislikePost({ id }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.post(`${BASE_URL}/posts/${id}/dislike`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function getPostComments({ postId }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get(`${BASE_URL}/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function createPostComment({ postId, content }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.post(`${BASE_URL}/comments/${postId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function deletePostComment({ postId, commentId }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.delete(
      `${BASE_URL}/comments/${postId}/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function editPostComment({ postId, commentId, content }) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.put(
      `${BASE_URL}/comments/${postId}/${commentId}`,
      { content }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

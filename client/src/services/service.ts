import axios from "axios";

export const getFeed = async () => {
    const feed = await axios.get("api/user/feed", {headers:{Authorization: localStorage.getItem("token")}});
    return feed.data;
}

export const getMyBlogs = async () => {
    const blogs = await axios.post("/api/blog/myblogs", {}, {headers:{Authorization:localStorage.getItem('token')}})
    return blogs.data;
}

export const getProfile = async () =>{
    const profile = await axios.get("/api/user/profile", {headers:{Authorization:localStorage.getItem('token')}})
    return profile.data;
}

export const getAuthor = async (id:string) => {
    const author = await axios.get(`/api/author/${id}`,)
    return author.data;
}

export const getFollowing = async () => {
    const following = await axios.get("/api/following", {headers:{Authorization:localStorage.getItem('token')}})
    return following.data;
}

export const getBlogsByAuthorId = async (id:string) => {
    const blogs = await axios.get(`/api/blog/getByAuthorId/${id}`)
    return blogs.data;
}

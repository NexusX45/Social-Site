import axios from "axios";

export const getFeed = async () => {
    const feed = await axios.get("api/user/feed", {headers:{Authorization: localStorage.getItem("token")}});
    return feed.data;
}

export const getMyBlogs = async () => {
    const blogs = await axios.post("/api/blog/myblogs", {}, {headers:{Authorization:localStorage.getItem('token')}})
    return blogs.data;
}
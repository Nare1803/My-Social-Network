import { useEffect, useState } from "react";
import { useHttpQuery } from "../../../../../helpers/useHttp";
import { IPost, IResponse } from "../../../../../helpers/types";
import { BASE_URL } from "../../../../../helpers/constants";
import { Http } from "../../../../../helpers/api";


export const Gallery = () => {
    // const { loading, error, data, refetch } = useHttpQuery<IResponse>(`/posts?userId=${userId}`);
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(()=> {
        Http
        .get("/posts")
        .then((response) =>setPosts(response.data.payload))
    })
    // useEffect(() => {
    //     if (!loading && data?.status === "success") {
    //         refetch(); 
    //     }
    // }, [data, loading, refetch]);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    // console.log(posts)
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Gallery</h1>
            {posts.map((post)=> (
                <div key = {post.id} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    {post.picture && (
                        <div className="mt-4 w-full h-64 bg-gray-700 rounded-lg overflow-hidden">
                            <img
                                src={BASE_URL +post.picture}
                                alt="Selected Post"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                  <span>{post.likes ? post.likes.length : 0} Likes</span>
                </div>
            ) 
            )}
        </div>
    );
};


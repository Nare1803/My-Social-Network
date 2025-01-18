import React, { useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IResponse, IPost, IContext } from "../../../../../helpers/types";
import { Http } from "../../../../../helpers/api";

export const AddPost: React.FC = () => {
    const {refetch,user} = useOutletContext<IContext>()
    const [content, setContent] = useState("");
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const photoInputRef = useRef<null | HTMLInputElement>(null);
    const navigate = useNavigate();
    const[posts,setPosts] = useState<IPost[]>(user?.posts || [])

    const handleFileChange = () => {
        const file = photoInputRef.current?.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPhotoPreview(reader.result as string);
        };
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const file = photoInputRef.current?.files?.[0];
        if (!content || !file) {
            alert("Please provide both content and a photo.");
            return;
        }

        const formData = new FormData();
        formData.append("content", content);
        formData.append("photo", file);

        Http.post<IResponse>("/posts", formData)
            .then((response) => {
                console.log("Post created:", response.data);
                refetch()
                setPhotoPreview("")
                // setPosts((prev) =>  [response.data, ...prev]);
                // navigate("/profile"); 
            })
            .catch((error) => {
                console.error("Error creating post:", error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Create a New Post</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500 resize-none"
                        rows={4}
                        required
                    />
                </div>
                <div className="flex items-center gap-6">
                    <input
                        type="file"
                        ref={photoInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="bg-gray-700 text-white rounded-lg p-2 cursor-pointer"
                        required
                    />
                    {photoPreview && (
                        <div className="w-20 h-20 bg-gray-700 rounded-full overflow-hidden border-2 border-blue-500">
                            <img
                                src={photoPreview}
                                alt="Preview"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
        
    );
};

import { useContext, useState } from "react";
import { AccountContext } from "../context";
import { BASE_URL } from "../../../../helpers/constants";
import { ActionButton } from "./action-button";
import { LikeButton } from "./reaction";

export const AccountHeader = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error("Out of provider...");

  const { account, refetch } = context;

  const [posts, setPosts] = useState(account.posts || []);

  return (
    <>
      {account.picture ? (
        <img
          className="w-44 h-44 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          src={BASE_URL + account.picture}
          alt={`${account.name}'s profile`}
        />
      ) : (
        <img
          className="w-44 h-44 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-512.png"
          alt="Default profile"
        />
      )}
      <h1 className="text-2xl font-bold mt-4">
        {account.name} {account.surname}
      </h1>
      <div className="flex gap-8 mt-2">
        <div className="flex flex-col items-center">
          <p className="text-sm font-bold text-blue-400">
            {account.followers?.length || 0}
          </p>
          <p className="text-gray-400 text-sm">Followers</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-bold text-blue-400">
            {account.following?.length || 0}
          </p>
          <p className="text-gray-400 text-sm">Following</p>
        </div>
      </div>
      <ActionButton />
      {account.isPrivate ? (
        <p className="mt-4 text-gray-500 italic">This page is private</p>
      ) : (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Posts</h2>
          <div className="grid grid-cols-3 gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="flex flex-col items-center">
                  {post.picture && (
                    <img
                      src={BASE_URL + post.picture}
                      alt={post.title}
                      className="w-full h-44 object-cover rounded-lg shadow-md"
                    />
                  )}
                  {post.title && (
                    <p className="text-sm text-center mt-2">{post.title}</p>
                  )}
                  <LikeButton post={{ id: post.id, liked: post.didILike ?? false,likes: post.likes || 0  }}  />
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">
                No posts available
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

import { useEffect, useState } from "react";
import { Http } from "../../../../helpers/api";
import { IResponse, IUser } from "../../../../helpers/types";
import { BASE_URL } from "../../../../helpers/constants";

export const Followers = () => {
    const [followers, setFollowers] = useState<IUser[]>([]);

    useEffect(() => {
        Http.get<IResponse>("/followers")
            .then((response) => {
                setFollowers(response.data.payload as IUser[]);
            })
            .catch((error) => console.error("Error fetching followers:", error));
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen py-8">
            <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">Followers</h2>
                {followers.length > 0 ? (
                    <div className="space-y-4">
                        {followers.map((follower) => (
                            <div
                                key={follower.id}
                                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
                            >
                                <div className="flex items-center space-x-4">
                                <img
                                src={
                                follower.picture
                                    ? BASE_URL + follower.picture
                                    : "https://cdn0.iconfinder.com/data/icons/business-and-management-flat-8/24/PROFILE_profile_picture_profile_icon_user_profile-512.png"
                                }
                                alt={follower.name}
                                className="w-12 h-12 rounded-full object-cover border border-gray-500"
                            />
                                    <div>
                                        <p className="text-xl font-semibold text-gray-200">{follower.name} {follower.surname}</p>
                                        <p className="text-sm text-gray-400">@{follower.surname}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No followers yet.</p>
                )}
            </div>
        </div>
    );
};

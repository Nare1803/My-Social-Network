import { useEffect, useState } from "react";
import { Http } from "../../../helpers/api";
import { IResponse, IUser } from "../../../helpers/types";
import { BASE_URL } from "../../../helpers/constants";

export const Followings = () => {
    const [followings, setFollowings] = useState<IUser[]>([]);

    useEffect(() => {
        Http.get<IResponse>("/following")
            .then((response) => {
                setFollowings(response.data.payload as IUser[]);
            })
            .catch((error) => console.error("Error fetching followings:", error));
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen py-8">
            <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">Followings</h2>
                {followings.length > 0 ? (
                    <div className="space-y-4">
                        {followings.map((following) => (
                            <div
                                key={following.id}
                                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
                            >
                                <div className="flex items-center space-x-4">
                                <img
                                src={
                                following.picture
                                    ? BASE_URL + following.picture
                                    : "https://cdn0.iconfinder.com/data/icons/business-and-management-flat-8/24/PROFILE_profile_picture_profile_icon_user_profile-512.png"
                                }
                                alt={following.name}
                                className="w-12 h-12 rounded-full object-cover border border-gray-500"
                            />
                                    <div>
                                        <p className="text-xl font-semibold text-gray-200">{following.name} {following.surname}</p>
                                        <p className="text-sm text-gray-400">@{following.surname}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No followings yet.</p>
                )}
            </div>
        </div>
    );
};

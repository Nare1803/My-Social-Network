import { useOutletContext } from "react-router-dom";
import { IContext } from "../../../helpers/types";
import { ProfileHeader } from "./components/profile-header";
import { Search } from "./components/search";
import { AddPost } from "./components/Feed/AddPost";
import { Gallery } from "./components/Feed/Gallery";


export const Profile = () => {
    const { user } = useOutletContext<IContext>();

    return (
        user && (
            <div className="min-h-screen bg-gray-900 text-white py-10">
                <div className="max-w-screen-xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-xl rounded-2xl p-6 mb-12">
                        <ProfileHeader  />
                    </div>
                    <div className="flex gap-12">
                        <div className="w-1/4 bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-12">
                            <div className="bg-gray-700 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition duration-200">
                                <Search />
                            </div>
                        </div>
                        <div className="w-3/4 space-y-12">
                            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition duration-200">
                                <AddPost />
                            </div>
                            <div className="space-y-8">
                                <Gallery />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
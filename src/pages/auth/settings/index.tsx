import { Privacy } from "./components/Privacy";
import { UpdateLogin } from "./components/UpdateLogin";
import { UpdatePassword } from "./components/UpdatPassword";

export const Settings = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
            <h1 className="text-4xl font-extrabold text-white bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded shadow-lg flex items-center justify-center mb-8">
                Settings
            </h1>
          
            <div className="flex space-x-8">
            <div className="mb-6">
                <Privacy />
            </div>
                <div className="flex-1">
                    <UpdatePassword />
                </div>
                <div className="flex-1">
                    <UpdateLogin />
                </div>
            </div>
        </div>
    );
};



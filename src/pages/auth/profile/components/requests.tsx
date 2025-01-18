import { useEffect } from "react";
import { Link } from "react-router-dom";
import { METHODS, useHttpMutation, useHttpQuery } from "../../../../helpers/useHttp";
import { IResponse, IUser } from "../../../../helpers/types";
import { BASE_URL } from "../../../../helpers/constants";

export const Requests = () => {
  const { data, loading, error, refetch } = useHttpQuery<IResponse>("/requests");

  const users: IUser[] = data && Array.isArray(data.payload)
    ? (data.payload as { user: IUser }[]).map(item => item.user)
    : [];

  const [request, requestError, requestLoading, requestData] = useHttpMutation<IResponse, { userId: string }>(refetch);
  const handleAccept = async (userId: string) => {
    try {
        await request(`/account/follow/${userId}`, METHODS.POST)
        refetch();
    } catch (error) {
        console.error("Error following user:", error);
    }
};

const handleDecline = async (userId: string) => {
    try {
        await request(`/requests/decline/${userId}`, METHODS.PATCH);
        refetch();
    } catch (error) {
        console.error("Error declining request:", error);
    }
};

  useEffect(() => {
    if (requestData) {
      console.log("Request successful:", requestData);
    }

    if (requestError) {
      console.error("Error:", requestError);
    }
  }, [requestData, requestError]);

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-300">Pending Requests</h2>
      {loading && <p className="text-gray-400">Loading requests...</p>}
      {error && <p className="text-red-500">Error loading requests</p>}
      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-3 bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={
                  user.picture
                    ? BASE_URL + user.picture
                    : "https://cdn0.iconfinder.com/data/icons/business-and-management-flat-8/24/PROFILE_profile_picture_profile_icon_user_profile-512.png"
                }
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-500"
              />
              <div className="ml-4">
                <Link
                  to={`/profile/${user.id}`}
                  className="text-lg font-semibold text-gray-200 hover:underline"
                >
                  {user.name} {user.surname}
                </Link>
                <p className="text-sm text-gray-400">@{user.surname}</p>
              </div>
              <button
                onClick={() => handleAccept(user.id)}
                className="ml-auto bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Accept
              </button>
              <button
                onClick={() => handleDecline(user.id)}
                className="ml-auto bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Decline
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No pending requests.</p>
        )}
      </div>
    </div>
  );
};

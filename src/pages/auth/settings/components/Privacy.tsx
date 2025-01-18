import { useState, useEffect } from "react";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";
import { IStatus } from "../../../../helpers/types";

export const Privacy: React.FC = () => {
  const [isPrivate, setIsPrivate] = useState<boolean>(() => {
    const storedStatus = localStorage.getItem("privacyStatus");
    return storedStatus === "private";
  });

  const [updatePrivacy] = useHttpMutation<any, IStatus>(() => {});

  const handleToggle = () => {
    const newStatus = isPrivate ? "public" : "private";
    
    setIsPrivate((prev) => {
      const updatedStatus = !prev;
      localStorage.setItem(
        "privacyStatus",
        updatedStatus ? "private" : "public"
      );
      return updatedStatus;
    });
    updatePrivacy("/account/set", METHODS.PATCH, { status: newStatus });
  };

  useEffect(() => {
    const fetchPrivacyStatus = async () => {
      const response = {
        status: localStorage.getItem("privacyStatus") || "public",
      };
      setIsPrivate(response.status === "private");
    };
    fetchPrivacyStatus();
  }, []);

  return (
    <div className="bg-gray-600 text-white p-4 rounded-lg shadow-md mx-4 w-[200px]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-300"> Privacy</p>
        <div className="flex items-center">
          {isPrivate ? (
            <img
              src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/lock-alt-512.png"
              alt="Private"
              className="mr-2"
              width={20}
            />
          ) : (
            <img
              src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/lock-open-alt-512.png"
              alt="Public"
              className="mr-2"
              width={20}
            />
          )}
          <button
            onClick={handleToggle}
            className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${
              isPrivate ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                isPrivate ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-300">
        {isPrivate ? "Private profile." : "Public profile."}
      </p>
    </div>
  );
};
   




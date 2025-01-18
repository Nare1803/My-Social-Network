import { SubmitHandler, useForm } from "react-hook-form";
import { IResponse, IUpdatePassword } from "../../../../helpers/types";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";


export const UpdatePassword = () => {
    const {reset,handleSubmit,formState:{errors},register} = useForm<IUpdatePassword>()
    const [patchUpdatePassword, error] = useHttpMutation<IResponse, IUpdatePassword>(reset)
  
    const onSubmit: SubmitHandler<IUpdatePassword> = (data) => {
        patchUpdatePassword("/update/password", METHODS.PATCH, data);
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                 {error && <p className="text-red-400 mt-4">{error}</p>}
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Update Password</h2>
                    {errors.old && <p className="text-red-400">{errors.old.message}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-medium mb-2">Current Password</label>
                        <input 
                            type="password" 
                            {...register("old", { required: "please fill your password" })}
                            className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your current password"

                        />
                    </div>
                    {errors.newpwd && <p className="text-red-400">{errors.newpwd.message}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-medium mb-2">New Password</label>
                        <input 
                            type="password" 
                            {...register("newpwd", { required: "please fill your new password"})}
                            className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter new password"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

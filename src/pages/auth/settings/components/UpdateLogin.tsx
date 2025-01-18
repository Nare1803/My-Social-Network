import { SubmitHandler, useForm } from "react-hook-form";
import { IResponse, IUpdateLogin } from "../../../../helpers/types";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";

export const UpdateLogin = () => {
    const {reset,register,formState:{errors},handleSubmit} = useForm<IUpdateLogin>()

    const [patchUpdateLogin,error] =  useHttpMutation<IResponse,IUpdateLogin>(reset)
    const onSubmit :SubmitHandler<IUpdateLogin> = (data) => {
       
       patchUpdateLogin("/update/login",METHODS.PATCH,data)
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                {error&&<p className="text-red-400 mt-4">{error}</p>}
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Update Login</h2>
                {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-medium mb-2">Current Password</label>
                   <input
                        type="password"
                        {...register("password",{required:"please fill the password"})}
                        className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your current password"
                    />
                </div>
                {errors.login && <p className="text-red-400">{errors.login.message}</p>}
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-medium mb-2">New Login</label>
                    <input
                        type="text"
                        {...register("login",{required:"please fill the login"})}
                        className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your new login"
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
    );
};

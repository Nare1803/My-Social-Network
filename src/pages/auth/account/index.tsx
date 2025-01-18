import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useHttpQuery } from "../../../helpers/useHttp";
import { IAccount, IResponse } from "../../../helpers/types";
import { AccountContext } from "./context"; 
import { AccountHeader } from "./components/account-header";
export const Account: React.FC = () => {
    const { id } = useParams(); 
    const { data, loading, error, refetch } = useHttpQuery<IResponse>("/account/" + id); 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <Navigate to='/profile' />;
    }

    const account: IAccount | null = data?.payload ? 
                                    (data.payload as IAccount) 
                                    : null;
    return account ? (
        <AccountContext.Provider value={{ account, refetch }}>
    
                <div>
                    <AccountHeader />
                
                </div>
        </AccountContext.Provider>
    ) : null;
};

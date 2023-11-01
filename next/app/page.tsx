"use client";

import { useEffect, useState } from "react";

import SiteCRUD from "../components/SiteCrud";
import { DomainTypeEnum, SiteInterface } from "../helpers/site.type";
import apiClient from "../services/api/client";

type Props = {};

const HomePage = (props: Props) => {
    const [site, setSite] = useState<null | SiteInterface>(null);
    const [notFound, setNotFound] = useState(false);
    const [domainType, setDomainType] = useState<null | DomainTypeEnum>(null);

    const getSite = async () => {
        try {
            const { data } = await apiClient.get("");
            setSite(data.site);
            setDomainType(data.type);
        } catch (error) {
            console.error("error", error);

            if (error instanceof Error && "response" in error) {
                const { response } = error as { response: { status: number } };
                if (response.status === 404) {
                    setNotFound(true);
                }
            }
        }
    };

    useEffect(() => {
        getSite();
    }, []);

    return (
        <div className="my-[7vh] md:my-[10vh] w-full md:max---w-2xl mx-auto">
            <h1 className="font-semibold mt-4 mb-2 text-xl tracking-widest"></h1>
            <div className="flex flex-col mx-2 p-6 bg-gray-900 rounded-md shadow-xl">
                <h1 className="font-semibold mt-4 mb-2 text-xl tracking-widest">
                    <div className="mb-4 uppercase">
                        {domainType &&
                            (domainType == DomainTypeEnum.SUBDOMAIN
                                ? "This is a subdomain page"
                                : "This the main domain homepage")}
                    </div>
                    {site && domainType == DomainTypeEnum.SUBDOMAIN && (
                        <>
                            <br />
                            SubDomain: {site?.subdomain}
                            <br />
                            Title: {site?.title}
                            <br />
                            Description: {site?.description}
                        </>
                    )}
                </h1>

                <div>{domainType && domainType == DomainTypeEnum.DOMAIN && <SiteCRUD />}</div>

                <div>{notFound && "Site not found"}</div>
            </div>
        </div>
    );
};

export default HomePage;

"use client";

import React, { useEffect, useState } from "react";

import { SiteInterface } from "../helpers/site.type";
import apiClient from "../services/api/client";

const SiteCRUD = () => {
    const [sites, setSites] = useState<SiteInterface[]>([]);
    const emptySite = { subdomain: "", title: "", description: "" };
    const [newSite, setNewSite] = useState({ ...emptySite });

    const fetchSites = async () => {
        const response = await apiClient.get("site");
        setSites(response.data);
    };

    const createSite = async () => {
        try {
            await apiClient.post("site", newSite);
            setNewSite({ ...emptySite });
            fetchSites();
        } catch (error) {
            console.error("Failed to create site:", error);
        }
    };

    const deleteSite = async (id: any) => {
        try {
            await apiClient.delete("site/" + id);
            fetchSites();
        } catch (error) {
            console.error("Failed to delete site:", error);
        }
    };

    useEffect(() => {
        fetchSites();
    }, []);

    return (
        <>
            <div className="p-4 space-y-4 bg-gray-100 rounded-md mb-4 text-gray-800">
                <h1 className="font-semibold text-xl text-gray-800">Manage Sites</h1>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Site Subdomain"
                        className="w-1/2 p-2 border rounded-md"
                        value={newSite.subdomain}
                        onChange={(e) => setNewSite({ ...newSite, subdomain: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Site Name"
                        className="w-1/2 p-2 border rounded-md"
                        value={newSite.title}
                        onChange={(e) => setNewSite({ ...newSite, title: e.target.value })}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Site Description"
                        className="w-full p-2 border rounded-md"
                        value={newSite.description}
                        onChange={(e) => setNewSite({ ...newSite, description: e.target.value })}
                    />
                </div>
                <button onClick={createSite} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Create Site
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Description
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Site
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sites.map((site) => (
                        <tr key={site.id}>
                            <td className="px-6 py-4 text-sm text-gray-900">{site.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{site.description}</td>
                            <td className="px-6 py-4 text-sm text-blue-500">
                                <a href={site.url} target="_blank">
                                    {site.url}
                                </a>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <button onClick={() => deleteSite(site.id)} className="text-red-500 hover:text-red-700">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default SiteCRUD;

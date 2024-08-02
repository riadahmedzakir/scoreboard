import { QueryKey, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

type ReturnType<TData, TError> = [(request: AxiosRequestConfig) => void, UseQueryResult<TData, TError>];

const useLazyQuery = <TData, TError = Error>(key: QueryKey, fetcher: (config: AxiosRequestConfig) => Promise<TData>, options: UseQueryOptions<TData, TError> = { queryKey: [] }): ReturnType<TData, TError> => {
    const [config, setConfig] = useState<AxiosRequestConfig | null>(null);

    const queryOptions = {
        ...options,
        enabled: config !== null,
        queryKey: key,
        queryFn: async () => {
            if (config) { return fetcher(config); }

            throw new Error('No config provided');
        },
    };

    const response = useQuery<TData, TError>(queryOptions);

    useEffect(() => {
        if (config) {
            response.refetch();
        }
    }, [config]);

    return [setConfig, response];
};

export default useLazyQuery;

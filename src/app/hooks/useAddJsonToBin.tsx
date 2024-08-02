import axios, { AxiosRequestConfig } from "axios";
import useLazyQuery from "./useLazyQuery";

const useAddJsonToBin = (timeStampId: string): any => {
    const [fetch, response] = useLazyQuery<any, Error>(['add-json-to-bin', timeStampId],
        async (config: AxiosRequestConfig<any>) => (await axios.request<any>(config)).data
    );

    const addJsonToBin = (data: any) => {
        const config: AxiosRequestConfig = {
            url: `https://api.jsonbin.io/v3/b/66964c60acd3cb34a866dff7`,
            method: 'PUT',
            headers: {
                'content-type': `application/json`,
                'x-master-key': ''
            },
            data: data
        };

        fetch(config);
    };

    return [addJsonToBin, response];
};

export default useAddJsonToBin;
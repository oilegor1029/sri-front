import { Environment, Network, RecordSource, Store, QueryResponseCache } from "relay-runtime";
import CONFIG from "./config";

// CACHING
const oneMinute = 1; // the cache is deactivated because the filters stop working, because when you change the filters the variables are kept.
const cache = new QueryResponseCache({ size: 100, ttl: oneMinute });

const { API_HOST } = CONFIG;

export let _csrfToken = null;

async function getCsrfToken() {
    if (_csrfToken === null) {
        const response = await fetch(`${API_HOST}/csrf/`, {
            credentials: "include"
        });
        const data = await response.json();
        _csrfToken = data.csrfToken;
    }
    return _csrfToken;
}

function fetchQuery(operation, variables, cacheConfig, uploadables) {
    const queryId = operation.name;
    const isMutation = operation.operationKind === "mutation";
    const isQuery = operation.operationKind === "query";
    const cachedData = cache.get(queryId, variables);
    const forceLoad = cacheConfig && cacheConfig.force;

    if (isQuery && !forceLoad && cachedData) {
        return cachedData;
    }

    if (forceLoad) {
        // clear() means to reset all the cache, not only the entry addressed by specific queryId.
        cache.clear();
    }

    return fetch(`${API_HOST}/graphql/`, {
        credentials: "include",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": getCsrfToken()
        },
        body: JSON.stringify({
            query: operation.text,
            variables
        })
    })
        .then((response) => {
            console.log('response: ', response);
            // if (response.redirected) {
            //     return window.location.replace(`${API_HOST}/authn?next=${document.location.href}`);
            // }
            return response.json();
        })
        .then((json) => {
            console.log('json: ', json);
            console.log('json.errors: ', json.errors);
            console.log('json.errors.length > 0: ', json.errors);
            let jsonResult;
            if (json.errors && json.errors.length > 0) {
                jsonResult = {data: "HOLA QUE TAL "}
                // window.location.replace(`${API_HOST}/authn?next=${document.location.href}`);
            } else {
                jsonResult = json;
            }
            // Update cache on queries
            if (isQuery && jsonResult) {
                cache.set(queryId, variables, jsonResult);
            }
            // Clear cache on mutations
            if (isMutation) {
                cache.clear();
            }

            return jsonResult
        })
        .catch((err) => {
            console.log(err);
            
            // window.location.replace(`${API_HOST}/authn?next=${document.location.href}`);
        });
}

const RelayEnvironment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource())
});

export default RelayEnvironment;

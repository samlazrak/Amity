# Integrations

Integrations provide the core backbone that helps Amity fetch data from third party REST APIs. The Integration class provides a standard interface for easily fechting or posting data without requring excessive boilerplate code or reliance on multiple inconsistent NPM modules or API SDKs.

## Creating a new integration

New integrations should be placed in the `src/integrations/` directory. For this example, we'll create an integration that allows us to fetch data from the NEST API.

Integrations are created by creating instances of the base Integration class in `src/integrations/base/integration.ts`. We can extend this class as necessary for new integrations if we need to provide additonal functionality.

Let's create a Nest integration under `src/integrations/nest.ts`:
```
import axios from 'axios';
import Integration from './base/integration';

const nestAxios = axios.create({
  baseURL: 'https://developer-api.nest.com',
});

const getNestHeaders = () => {
  return {
    Authorization: 'Bearer <nest-auth-token-here>',
    'Content-Type': 'application/json',
  };
};

const nestIntegration = new Integration({
  axiosInstance: nestAxios,
  getHeaders: getNestHeaders,
  convertRequestToSnakeCase: true,
  convertRequestToCamelCase: true,
});

export default nestIntegration;
```

Now let's break this down. We start by creating a new Axios instance with a baseURL for API requests. Axios is an NPM module that the Integration class uses to make the actual HTTP requests when fetching data. All requests will be built on top of this base URL, in this case "https://developer-api.nest.com". Next we define a function called `getNestHeaders` that is responsible for providing all data necessary for authentication, content types, etc. The object this function returns will define the headers for every API request the integration makes. In the case of Nest, we provide `Authorization` and `Content-Type`.

Finally, we create the actual Integration instance. The constructor takes in a `IntegrationConfig` object, which provides `axiosInstance`, `getHeaders`, and two other flags - `convertRequestToSnakeCase` and `convertResponseToCamelCase`. These two flags are required to determine how we should transform the request and response objects when making API calls.

Since the Nest API returns snake cased data, the integration will automatically convert it to camel case to keep our codebase clean and consistent.

For example, the following response:
```
[
  {
    camera_name: 'Camera 1',
    share_url: 'https://nestshare.com/cameras/1234',
  },
  {
    camera_name: 'Camera 2',
    share_url: 'https://nestshare.com/cameras/5678',
  }
]
```

would be converted into:
```
[
  {
    cameraName: 'Camera 1',
    shareUrl: 'https://nestshare.com/cameras/1234',
  },
  {
    cameraName: 'Camera 2',
    shareUrl: 'https://nestshare.com/cameras/5678',
  }
]
```

Providing a `convertRequestToSnakeCase` value of `true` will convert both URL params and form data to snake case.
Now that we have created our Nest integration instace, we can import it elsewhere in the codebase to make actual API requests.

## Fetching data with integrations


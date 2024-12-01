# Shopify App Template - Remix

This is a template for building a [Shopify app](https://shopify.dev/docs/apps/getting-started) using the [Remix](https://remix.run) framework. This app allows users to efficiently manage and track orders, view and resolve unresolved issues, and receive notifications about pending issues directly within the app.

## Features

- **Order Management**: Efficiently manage and track orders with real-time updates.
- **Issue Tracking**: View and resolve unresolved issues related to orders.
- **User Notifications**: Get notified about pending issues directly within the app.

## Installation Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   SHOPIFY_API_KEY=your_api_key
   SHOPIFY_API_SECRET=your_api_secret
   ```

## Usage

### Navigating the App

- **Home**: Overview of your orders and their statuses.
- **Additional Page**: Additional resources and links for users.
- **Issue Tracker**: Detailed view of unresolved issues for each order.

### API Integration

#### Fetching Order Issues

Here’s how to fetch order issues using the Admin API:

```javascript
const fetchOrderIssues = async (orderId) => {
  const response = await fetch(`/api/order/${orderId}/issues`);
  const data = await response.json();
  return data;
};
```

## Troubleshooting

- **Authentication Issues**: Ensure your API keys are correctly set in the environment variables.
- **Data Fetching Errors**: Check the network tab in your browser's developer tools for any failed requests.
## License

This project is licensed under the MIT License.

## Resources

- [Remix Docs](https://remix.run/docs/en/v1)
- [Shopify App Remix](https://shopify.dev/docs/api/shopify-app-remix)
- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App authentication](https://shopify.dev/docs/apps/auth)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [App extensions](https://shopify.dev/docs/apps/app-extensions/list)
- [Shopify Functions](https://shopify.dev/docs/api/functions)
- [Getting started with internationalizing your app](https://shopify.dev/docs/apps/best-practices/internationalization/getting-started)

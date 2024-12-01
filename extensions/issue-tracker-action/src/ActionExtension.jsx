import { useEffect, useState } from 'react';
import {
  reactExtension,
  useApi,
  AdminAction,
  BlockStack,
  Button,
  Text,
  InlineStack,
  Divider,
  Paragraph,
  Banner,
  ProgressIndicator
} from '@shopify/ui-extensions-react/admin';
import Issue from './Issue.jsx';

// The target used here must match the target used in the extension's toml file (./shopify.extension.toml)
const TARGET = 'admin.order-details.action.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  // The useApi hook provides access to several useful APIs like i18n, close, and data.
  const { i18n, close, data } = useApi(TARGET);
  console.log(JSON.stringify(data));
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState(null);
  const [issueLen, setIssueLen] = useState(0);


  console.log({ data });
  // Use direct API calls to fetch data from Shopify.
  // See https://shopify.dev/docs/api/admin-graphql for more information about Shopify's GraphQL API

  useEffect(() => {
    (async function fetchIssue() {
      setLoading(true);
      setError(null);
      const order_id = data?.selected[0]?.id.replace('gid://shopify/Order/', '');
      const response = await fetch(`/api/order/${order_id}/issues`);
      const issueData = await response.json();


      console.log(issueData);
      if (issueData.status === 'error') {
        setError(issueData.message);
      } else {
        setIssue(issueData);
        setIssueLen(issueData.filter(issue => issue.issue_status.toLowerCase() === 'pending').length);

      }
      setLoading(false);
    })();
  }, [data?.selected[0]]);

  if (loading) {
    return (
      <InlineStack blockAlignment='center' inlineAlignment='center'>
        <ProgressIndicator size="large-100" />
      </InlineStack>
    );
  }
  if (error) {
    return (
      <AdminAction >

        <Text tone="critical">Error: {error}</Text>
      </AdminAction>
    );
  }

  return (
    // The AdminAction component provides an API for setting the title and actions of the Action extension wrapper.
    <AdminAction
      primaryAction={
        <Button
          onPress={() => {
            // console.log('saving');
            close();
          }}
        >
          Done
        </Button>
      }
    >
      <BlockStack>
        {/* Set the translation values for each supported language in the locales directory */}
        {/* <Text fontWeight="bold">{i18n.translate('welcome', {TARGET})}</Text> */}
        <Banner tone="critical" dismissible onDismiss={() => console.log('dismissed banner')}>
          <Paragraph>This order has {issueLen} pending issues</Paragraph>
        </Banner>
        {issue ? issue
          .sort((a, b) => {
            const statusOrder = ['init', 'pending', 'waiting for response', 'closed'];
            return statusOrder.indexOf(a.issue_status) - statusOrder.indexOf(b.issue_status);
          })
          .map((singleIssue, index) => (
            <Issue key={index} issue={singleIssue} /> // Render an Issue component for each issue
          )) : null}

      </BlockStack>
    </AdminAction>
  );
}
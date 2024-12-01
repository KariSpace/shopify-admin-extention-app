import {
  reactExtension,
  useApi,
  AdminBlock,
  BlockStack,
  Text,
  InlineStack,
  ProgressIndicator,
  Box,
  Divider,
  Badge
} from '@shopify/ui-extensions-react/admin';
import { useState, useEffect } from 'react';
import Issue from './Issue.jsx';

// The target used here must match the target used in the extension's toml file (./shopify.extension.toml)
const TARGET = 'admin.order-details.block.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  // The useApi hook provides access to several useful APIs like i18n and data.
  const {i18n, data} = useApi(TARGET);
  console.log(JSON.stringify(data));
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState(null);
  const [issueLen, setIssueLen] = useState(0);

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
        setIssueLen(issueData.length);

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
      <AdminBlock title="Error">
        <Text tone="critical">{error}</Text>
      </AdminBlock>
    );
  }
  return (
    // The AdminBlock component provides an API for setting the title of the Block extension wrapper.
    <AdminBlock title="Issues Block">
      <BlockStack>
      <Text fontWeight="bold">This order has {issueLen} unresolved issues</Text>

      {issue ? issue.map((singleIssue, index) => (
          <Issue key={index} issue={singleIssue} /> // Render an Issue component for each issue
        )) : null}

      <Divider />
      </BlockStack>
    </AdminBlock>
  );
}